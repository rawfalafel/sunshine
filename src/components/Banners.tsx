/** @format */

import React from "react";
import styled from "styled-components/macro";
import colors from "../utils/colors";
import { isBalanceZero } from "../utils/index";

const StyledBanner = styled.section`
  display: flex;
  border: 1px solid ${colors.lightGray};
  padding: 12px 20px;
  border-radius: 16px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 1000px;
`;

const StyledInfo = styled.div`
  flex: 1;
`;

const StyledP1 = styled.p`
  font-weight: bold;
  font-size: 1.2em;
`;

const StyledP2 = styled.p``;

const StyledDismissButton = styled.button`
  margin-left: 16px;
`;

export function Banner({
  line1,
  line2,
  onDismiss,
}: {
  line1: string;
  line2: string;
  onDismiss?: () => void;
}) {
  return (
    <StyledBanner>
      <StyledInfo>
        <StyledP1>{line1}</StyledP1>
        <StyledP2>{line2}</StyledP2>
      </StyledInfo>
      {onDismiss && (
        <StyledDismissButton onClick={onDismiss}>Dismiss</StyledDismissButton>
      )}
    </StyledBanner>
  );
}

export default function Banners({
  balance,
  withdrawal,
  send,
  setWithdrawal,
  setSend,
}: {
  balance: string;
  withdrawal: Withdrawal | undefined;
  send: Send | undefined;
  setWithdrawal: (w: Withdrawal | undefined) => void;
  setSend: (s: Send | undefined) => void;
}) {
  if (send) {
    if (!send.isComplete) {
      return (
        <Banner
          line1={`We're sending ${send.ethAmount} ETH to ${send.recipientAddress}!`}
          line2={`Your money should arrive around ${send.eta}.`}
        />
      );
    }

    return (
      <Banner
        line1={`Your money was successfully sent!`}
        line2={`You can now ask the recipient to verify.`}
        onDismiss={() => setSend(undefined)}
      />
    );
  }

  if (withdrawal) {
    if (!withdrawal.isComplete) {
      return (
        <Banner
          line1={`We're withdrawing ${withdrawal.totalEthAmount} ETH to your burner wallet.`}
          line2={`Your cash should be available around ${withdrawal.eta}.`}
        />
      );
    }
    return (
      <Banner
        line1={`We've withdrawn ${withdrawal.totalEthAmount} ETH to your burner wallet!`}
        line2={`You can use it to anonymously send funds, register an ENS domain, donate on Gitcoin, and more.`}
        onDismiss={() => setWithdrawal(undefined)}
      />
    );
  }

  if (isBalanceZero(balance)) {
    return (
      <Banner
        line1="Welcome to Wallaroo, the easy burner wallet for Tornado.cash!"
        line2="Here, you can withdraw your Tornado.cash transactions to a temporary private address."
      />
    );
  }

  return null;
}
