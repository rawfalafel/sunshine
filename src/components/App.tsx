/** @format */

import { dai, eth } from "@burner-wallet/assets";
import BurnerCore from "@burner-wallet/core";
import InfuraGateway from "@burner-wallet/core/gateways/InfuraGateway";
import InjectedSigner from "@burner-wallet/core/signers/InjectedSigner";
import LocalSigner from "@burner-wallet/core/signers/LocalSigner";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Card from "./Card";
import Wallet from "./Wallet";

const StyledApp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 100px 0;
`;

type View = "home" | "send" | "withdraw";

function App() {
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [core, setCore] = useState<BurnerCore | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [view, setView] = useState<View>("home");

  useEffect(() => {
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

  if (!balance || !address) {
    return (
      <StyledApp>
        <Card>Loading...</Card>
      </StyledApp>
    );
  }

  return (
    <StyledApp>
      {view === "home" && (
        <Wallet
          balance={balance}
          address={address}
          onSend={() => setView("send")}
          onWithdraw={() => setView("withdraw")}
        />
      )}
    </StyledApp>
  );
}

export default App;
