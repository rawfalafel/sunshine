import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";

import BurnerCore from "@burner-wallet/core";
import LocalSigner from "@burner-wallet/core/signers/LocalSigner";
import InjectedSigner from "@burner-wallet/core/signers/InjectedSigner";
import InfuraGateway from "@burner-wallet/core/gateways/InfuraGateway";
// import HTTPGateway from "@burner-wallet/core/gateways/HTTPGateway";
// import { dai, eth } from "@burner-wallet/assets";

import styled from "styled-components/macro";
import LoadingBalance from "./LoadingBalance";
import Deposit from "./Deposit";
import Transfer from "./Transfer";

const StyledApp = styled.div`
  display: flex;
`;

function App() {
  const [balance, setBalance] = useState<undefined | number>(0);

  const core = new BurnerCore({
    signers: [new InjectedSigner(), new LocalSigner()],
    gateways: [new InfuraGateway(process.env.REACT_APP_INFURA_KEY)],
    // gateways: [new HTTPGateway("http://127.0.0.1:8525", "1")],
    // assets: [dai, eth],
    assets: [],
  });

  const accounts = core.getAccounts();
  const web3 = core.getWeb3("1");

  /*
  web3.eth.getBalance(accounts[0]).then((_balance) => {
    setBalance(parseInt(_balance));
  });
  */

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
