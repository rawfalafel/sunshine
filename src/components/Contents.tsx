/** @format */

import BurnerCore from "@burner-wallet/core";
import React, { useState } from "react";
import Banners from "./Banners";
import SendCard from "./SendCard";
import Wallet from "./Wallet";
import WithdrawCard from "./WithdrawCard";

type View = "home" | "send" | "withdraw";

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
      <section>
        {view === "home" && (
          <Wallet
            balance={balance}
            address={address}
            onSend={() => setView("send")}
            onWithdraw={() => setView("withdraw")}
          />
        )}
        {view === "withdraw" && <WithdrawCard onBack={() => setView("home")} />}
        {view === "send" && <SendCard onBack={() => setView("home")} />}
      </section>
    </React.Fragment>
  );
}
