/** @format */

import { dai, eth } from "@burner-wallet/assets";
import BurnerCore from "@burner-wallet/core";
import InfuraGateway from "@burner-wallet/core/gateways/InfuraGateway";
import InjectedSigner from "@burner-wallet/core/signers/InjectedSigner";
import LocalSigner from "@burner-wallet/core/signers/LocalSigner";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import provingKey from "../assets/withdrawProvingKey";
import Contents from "./Contents";
import Ellipsis from "./Ellipsis";
import Nav from "./Nav";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
`;

function App() {
  useEffect(() => {
    // TODO(yutaro): replace this
    console.log(provingKey);
  }, []);

  const withdrawalEx = {
    note: "asdfasdf",
    totalEthAmount: 0.3,
    eta: "15:45",
    isComplete: false,
  };

  const sendEx = {
    ethAmount: 0.1,
    recipientAddress: "0x235829357239529385",
    eta: "18:44",
    isComplete: false,
  };

  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [core, setCore] = useState<BurnerCore | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [withdrawal, setWithdrawal] = useState<Withdrawal | undefined>(
    withdrawalEx
  );
  const [send, setSend] = useState<Send | undefined>(sendEx);

  // Fetch the balance, address, in-progress withdrawal, and in-progress send
  useEffect(() => {
    // TODO(Fetch from cookie)
    const core = new BurnerCore({
      signers: [new LocalSigner(), new InjectedSigner()],

      // A single Infura key can handle up to 100k requests per day before being rate-limited.
      // If we get more traffic than that, we would need to switch to an Ethereum node.
      gateways: [new InfuraGateway(process.env.REACT_APP_INFURA_KEY)],
      assets: [dai, eth],
    });

    setCore(core);

    const address = core.getAccounts()[0];
    setAddress(address);

    const web3 = core.getWeb3("1");

    web3.eth.getBalance(address).then((_balance) => {
      setBalance(_balance);
    });
  }, []);

  // let Body;
  // if (balance === undefined) {
  //   Body = <LoadingBalance />;
  // } else if (balance === 0) {
  //   Body = <Deposit core={core} />;
  // } else {
  //   Body = <Transfer />;
  // }

  let contents =
    balance && address && core ? (
      <Contents
        balance={balance}
        address={address}
        core={core}
        withdrawal={withdrawal}
        send={send}
        setWithdrawal={setWithdrawal}
        setSend={setSend}
      />
    ) : (
      <Ellipsis size={100} />
    );

  return (
    <StyledApp>
      <Nav />
      {contents}
    </StyledApp>
  );
}

export default App;
