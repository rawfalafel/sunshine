/** @format */

import React from "react";
import Button from "./Button";
import Card from "./Card";

export default function WithdrawCard({ onBack }: { onBack: () => void }) {
  function initiateWithdraw() {}

  return (
    <Card>
      <section>
        <h2>Withdraw from Tornado.cash</h2>

        <Button onClick={initiateWithdraw}>Withdraw</Button>
      </section>
    </Card>
  );
}
