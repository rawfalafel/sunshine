// @ts-nocheck

import axios from "axios";
import { Buffer } from "buffer";
import circomlib from "circomlib";
import { toWei, fromWei, toBN, BN } from "web3-utils";
import config from "../tornado-cash-config";
import merkleTree from "./MerkleTree";
import snarkjs from "snarkjs";
import stringifybigint from "./stringifyBigInt";

import contractJSON from "../static/ETHTornadoContract.json";
import circuit from "../static/withdrawCircuit.json";

const MERKLE_TREE_HEIGHT = 20;

/** Compute pedersen hash */
const pedersenHash = data => circomlib.babyJub.unpackPoint(circomlib.pedersenHash.hash(data))[0]

/** BigNumber to hex string of specified length */
function toHex(number, length = 32) {
  const str = number instanceof Buffer ? number.toString('hex') : BigInt(number).toString(16)
  return '0x' + str.padStart(length * 2, '0')
}

/**
 * Create deposit object from secret and nullifier
 */
function createDeposit({ nullifier, secret }) {
  const deposit = { nullifier, secret }
  deposit.preimage = Buffer.concat([deposit.nullifier.leInt2Buff(31), deposit.secret.leInt2Buff(31)])
  deposit.commitment = pedersenHash(deposit.preimage)
  deposit.commitmentHex = toHex(deposit.commitment)
  deposit.nullifierHash = pedersenHash(deposit.nullifier.leInt2Buff(31))
  deposit.nullifierHex = toHex(deposit.nullifierHash)
  return deposit
}

function parseNote(note: string) {
  const noteRegex = /tornado-(?<currency>\w+)-(?<amount>[\d.]+)-(?<netId>\d+)-0x(?<note>[0-9a-fA-F]{124})/g
  const match = noteRegex.exec(note)
  if (!match) {
    throw new Error('The note has invalid format')
  }

  const buf = Buffer.from(match.groups.note, 'hex')
  const nullifier = BigInt.leBuff2int(buf.slice(0, 31))
  const secret = BigInt.leBuff2int(buf.slice(31, 62))
  const deposit = createDeposit({ nullifier, secret })
  const netId = Number(match.groups.netId)

  return { currency: match.groups.currency, amount: match.groups.amount, netId, deposit }
}

function calculateFee({ gasPrices, currency, amount, refund, ethPrices, relayerServiceFee, decimals }) {
  const decimalsPoint = Math.floor(relayerServiceFee) === Number(relayerServiceFee) ?
    0 :
    relayerServiceFee.toString().split('.')[1].length
  const roundDecimal = 10 ** decimalsPoint
  const total = toBN(fromDecimals({ amount, decimals }))
  const feePercent = total.mul(toBN(relayerServiceFee * roundDecimal)).div(toBN(roundDecimal * 100))
  const expense = toBN(toWei(gasPrices.fast.toString(), 'gwei')).mul(toBN(5e5))
  let desiredFee
  switch (currency) {
  case 'eth': {
    desiredFee = expense.add(feePercent)
    break
  }
  default: {
    desiredFee = expense.add(toBN(refund))
      .mul(toBN(10 ** decimals))
      .div(toBN(ethPrices[currency]))
    desiredFee = desiredFee.add(feePercent)
    break
  }
  }
  return desiredFee
}

/**
 * Generate merkle tree for a deposit.
 * Download deposit events from the tornado, reconstructs merkle tree, finds our deposit leaf
 * in it and generates merkle proof
 * @param deposit Deposit object
 */
async function generateMerkleProof(tornado, deposit) {
  // Get all deposit events from smart contract and assemble merkle tree from them
  console.log('Getting current state from tornado contract')
  const events = await tornado.getPastEvents('Deposit', { fromBlock: 0, toBlock: 'latest' })
  const leaves = events
    .sort((a, b) => a.returnValues.leafIndex - b.returnValues.leafIndex) // Sort events in chronological order
    .map(e => e.returnValues.commitment)
  const tree = new merkleTree(MERKLE_TREE_HEIGHT, leaves)

  // Find current commitment in the tree
  const depositEvent = events.find(e => e.returnValues.commitment === toHex(deposit.commitment))
  const leafIndex = depositEvent ? depositEvent.returnValues.leafIndex : -1

  // Validate that our data is correct
  const root = await tree.root()
  const isValidRoot = await tornado.methods.isKnownRoot(toHex(root)).call()
  const isSpent = await tornado.methods.isSpent(toHex(deposit.nullifierHash)).call()

  if (!isValidRoot) {
    console.error("Merkle tree is corrupted");
    return;
  }

  if (isSpent) {
    console.error("The note is already spent");
    return;
  }

  if (leafIndex < 0) {
    console.error("The deposit is not found in the tree");
    return;
  }

  // Compute merkle proof of our commitment
  return tree.path(leafIndex)
}

/**
 * Generate SNARK proof for withdrawal
 * @param deposit Deposit object
 * @param recipient Funds recipient
 * @param relayer Relayer address
 * @param fee Relayer fee
 * @param refund Receive ether for exchanged tokens
 */
async function generateProof({ tornado, deposit, recipient, relayerAddress = 0, fee = 0, refund = 0 }) {
  // Compute merkle proof of our commitment
  const { root, path_elements, path_index } = await generateMerkleProof(tornado, deposit)

  // Prepare circuit input
  const input = {
    // Public snark inputs
    root: root,
    nullifierHash: deposit.nullifierHash,
    recipient: BigInt(recipient),
    relayer: BigInt(relayerAddress),
    fee: BigInt(fee),
    refund: BigInt(refund),

    // Private snark inputs
    nullifier: deposit.nullifier,
    secret: deposit.secret,
    pathElements: path_elements,
    pathIndices: path_index,
  }

  console.log("fetching proving key");
  const provingKeyBin = await fetch("./withdraw_proving_key.bin")
  const provingKey = await provingKeyBin.arrayBuffer();

  console.time("Generating SNARK proof");
  const proofData = await window.genZKSnarkProofAndWitness(input, circuit, provingKey);

  console.timeEnd("Generating SNARK proof");
  console.log(JSON.stringify(proofData, null, 1));

  const { proof } = toSolidityInput(proofData);

  console.log("proof", proof);

  const args = [
    toHex(input.root),
    toHex(input.nullifierHash),
    toHex(input.recipient, 20),
    toHex(input.relayer, 20),
    toHex(input.fee),
    toHex(input.refund)
  ]

  return { proof, args }
}

async function withdraw(web3, deposit, currency, amount, recipient, relayerURL, refund = '0') {
  const tornadoAddress = config.deployments.netId1[currency].instanceAddress[amount];

  const tornado = new web3.eth.Contract(contractJSON.abi, tornadoAddress);

  if (currency === 'eth' && refund !== '0') {
    throw new Error('The ETH purchase is supposted to be 0 for ETH withdrawals')
  }
  refund = toWei(refund)
  if (relayerURL) {
    if (relayerURL.endsWith('.eth')) {
      throw new Error('ENS name resolving is not supported. Please provide DNS name of the relayer. See instuctions in README.md')
    }
    const relayerStatus = await axios.get(relayerURL + '/status')
    const { relayerAddress, netId, gasPrices, ethPrices, relayerServiceFee } = relayerStatus.data

    console.log('Relay address: ', relayerAddress)

    const decimals = config.deployments.netId1[currency].decimals
    const fee = calculateFee({ gasPrices, currency, amount, refund, ethPrices, relayerServiceFee, decimals })
    if (fee.gt(fromDecimals({ amount, decimals }))) {
      throw new Error('Too high refund')
    }
    const { proof, args } = await generateProof({ tornado, deposit, recipient, relayerAddress, fee, refund })

    console.log('Sending withdraw transaction through relay')
    return;
    try {
      const relay = await axios.post(relayerURL + '/relay', { contract: tornado._address, proof, args })
      if (netId === 1 || netId === 42) {
        console.log(`Transaction submitted through the relay. View transaction on etherscan https://${getCurrentNetworkName()}etherscan.io/tx/${relay.data.txHash}`)
      } else {
        console.log(`Transaction submitted through the relay. The transaction hash is ${relay.data.txHash}`)
      }

      const receipt = await waitForTxReceipt({ txHash: relay.data.txHash })
      console.log('Transaction mined in block', receipt.blockNumber)
    } catch (e) {
      if (e.response) {
        console.error(e.response.data.error)
      } else {
        console.error(e.message)
      }
    }
  } else { // using private key
    const { proof, args } = await generateProof({ deposit, recipient, refund })

    console.log('Submitting withdraw transaction')
    await tornado.methods.withdraw(proof, ...args).send({ from: senderAccount, value: refund.toString(), gas: 1e6 })
      .on('transactionHash', function (txHash) {
        if (netId === 1 || netId === 42) {
          console.log(`View transaction on etherscan https://${getCurrentNetworkName()}etherscan.io/tx/${txHash}`)
        } else {
          console.log(`The transaction hash is ${txHash}`)
        }
      }).on('error', function (e) {
        console.error('on transactionHash error', e.message)
      })
  }
  console.log('Done')
}

function fromDecimals({ amount, decimals }) {
  amount = amount.toString()
  let ether = amount.toString()
  const base = new BN('10').pow(new BN(decimals))
  const baseLength = base.toString(10).length - 1 || 1

  const negative = ether.substring(0, 1) === '-'
  if (negative) {
    ether = ether.substring(1)
  }

  if (ether === '.') {
    throw new Error('[ethjs-unit] while converting number ' + amount + ' to wei, invalid value')
  }

  // Split it into a whole and fractional part
  const comps = ether.split('.')
  if (comps.length > 2) {
    throw new Error(
      '[ethjs-unit] while converting number ' + amount + ' to wei,  too many decimal points'
    )
  }

  let whole = comps[0]
  let fraction = comps[1]

  if (!whole) {
    whole = '0'
  }
  if (!fraction) {
    fraction = '0'
  }
  if (fraction.length > baseLength) {
    throw new Error(
      '[ethjs-unit] while converting number ' + amount + ' to wei, too many decimal places'
    )
  }

  while (fraction.length < baseLength) {
    fraction += '0'
  }

  whole = new BN(whole)
  fraction = new BN(fraction)
  let wei = whole.mul(base).add(fraction)

  if (negative) {
    wei = wei.mul(negative)
  }

  return new BN(wei.toString(10), 10)
}

const { hexifyBigInts, unhexifyBigInts, stringifyBigInts, unstringifyBigInts } = stringifybigint;

const stringifyBigInts2 = snarkjs.stringifyBigInts;
const unstringifyBigInts2 = snarkjs.unstringifyBigInts;

function toSolidityInput(proof) {
  const flatProof = unstringifyBigInts([
    proof.pi_a[0], proof.pi_a[1],
    proof.pi_b[0][1], proof.pi_b[0][0],
    proof.pi_b[1][1], proof.pi_b[1][0],
    proof.pi_c[0], proof.pi_c[1],
  ]);
  const result = {
    proof: "0x" + flatProof.map(x => toHex32(x)).join("")
  };
  if (proof.publicSignals) {
    result.publicSignals = hexifyBigInts(unstringifyBigInts(proof.publicSignals));
  }
  return result;
}

function toHex32(number) {
  let str = number.toString(16);
  while (str.length < 64) str = "0" + str;
  return str;
}

export default {
  parseNote,
  withdraw
};