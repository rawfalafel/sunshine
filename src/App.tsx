import React, { useState, useEffect } from "react";
import "./App.css";

import BurnerCore from "@burner-wallet/core";
import LocalSigner from "@burner-wallet/core/signers/LocalSigner";
import InjectedSigner from "@burner-wallet/core/signers/InjectedSigner";
import InfuraGateway from "@burner-wallet/core/gateways/InfuraGateway";
import HTTPGateway from "@burner-wallet/core/gateways/HTTPGateway";
import { dai, eth } from "@burner-wallet/assets";

import styled from "styled-components/macro";
import LoadingBalance from "./LoadingBalance";
import Deposit from "./Deposit";
import Transfer from "./Transfer";

const StyledApp = styled.div`
  display: flex;
`;

function App(props: any) {
  const [balance, setBalance] = useState<undefined | number>(undefined);
  const [core, setCore] = useState<any>(undefined);

  useEffect(() => {
    const httpGateway =
      process.env.REACT_APP_HTTP_GATEWAY || "http://localhost:8525";

    const core = new BurnerCore({
      signers: [new LocalSigner(), new InjectedSigner()],
      gateways: [new InfuraGateway(process.env.REACT_APP_INFURA_KEY)],
      // gateways: [new HTTPGateway(httpGateway, "1")],
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
