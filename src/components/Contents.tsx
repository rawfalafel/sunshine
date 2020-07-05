/** @format */

import BurnerCore from "@burner-wallet/core";
import React, { useState } from "react";
import styled from "styled-components/macro";
import Banners from "./Banners";
import SendCard from "./SendCard";
import Wallet from "./Wallet";
import Wally from "./Wally";
import WithdrawCard from "./WithdrawCard";

type View = "home" | "send" | "withdraw";

const StyledContainer = styled.div`
  position: relative;
`;

export default function Contents({
  balance,
  address,
  core,
  withdrawal,
  send,
  setWithdrawal,
  setSend,
}: {
  balance: string;
  address: string;
  core: BurnerCore;
  withdrawal: Withdrawal | undefined;
  send: Send | undefined;
  setWithdrawal: (w: Withdrawal | undefined) => void;
  setSend: (s: Send | undefined) => void;
}) {
  const [view, setView] = useState<View>("home");
  return (
    <React.Fragment>
      <Banners
        balance={balance}
        withdrawal={withdrawal}
        send={send}
        setWithdrawal={setWithdrawal}
        setSend={setSend}
      />
      <StyledContainer>
        <Wally view={view} />
        <section>
          {view === "home" && (
            <Wallet
              balance={balance}
              address={address}
              onSend={() => setView("send")}
              onWithdraw={() => setView("withdraw")}
            />
          )}
          {view === "withdraw" && (
            <WithdrawCard core={core} onBack={() => setView("home")} />
          )}
          {view === "send" && <SendCard onBack={() => setView("home")} />}
        </section>
      </StyledContainer>
    </React.Fragment>
  );
}
