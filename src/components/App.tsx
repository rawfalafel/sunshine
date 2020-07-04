/** @format */

import BurnerCore from "@burner-wallet/core";
import InfuraGateway from "@burner-wallet/core/gateways/InfuraGateway";
import InjectedSigner from "@burner-wallet/core/signers/InjectedSigner";
import LocalSigner from "@burner-wallet/core/signers/LocalSigner";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { dai, eth } from "@burner-wallet/assets";
import Deposit from "./Deposit";
import LoadingBalance from "./LoadingBalance";
import Transfer from "./Transfer";

const StyledApp = styled.div`
  display: flex;
`;

function App() {
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const [core, setCore] = useState<BurnerCore | undefined>(undefined);

  useEffect(() => {
    const core = new BurnerCore({
      signers: [new LocalSigner(), new InjectedSigner()],

      // A single Infura key can handle up to 100k requests per day before being rate-limited.
      // If we get more traffic than that, we would need to switch to an Ethereum node.
      gateways: [new InfuraGateway(process.env.REACT_APP_INFURA_KEY)],
      assets: [dai, eth],
    });

    setCore(core);

    const accounts = core.getAccounts();
    const web3 = core.getWeb3("1");

    web3.eth.getBalance(accounts[0]).then((_balance) => {
      setBalance(parseInt(_balance));
    });
  }, []);

  let Body;
  if (balance === undefined) {
    Body = <LoadingBalance />;
  } else if (balance === 0) {
    Body = <Deposit core={core} />;
  } else {
    Body = <Transfer />;
  }

  return <StyledApp>{Body}</StyledApp>;
}

export default App;
