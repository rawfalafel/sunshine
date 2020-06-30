import React from "react";
import styled from "styled-components/macro";

const DepositContainer = styled.section``;

const Header = styled.section`
  font-size: 1.5rem;
`;

const Welcome = styled.h1`
  font-size: 3.2rem;
`;

const DepositHeader = styled.h2`
  font-size: 1.5rem;
`;

const DepositBox = styled.section``;

const WithdrawButton = styled.section``;

const WithdrawEstimate = styled.section``;

export default function Deposit() {
  return (
    <DepositContainer>
      <Header>Sunshine.cash</Header>
      <Welcome>
        Withdraw your Tornado.cash transactions to a secure private address.
      </Welcome>
      <DepositHeader>Note(s) to withdraw</DepositHeader>
      <DepositBox></DepositBox>
      <WithdrawButton></WithdrawButton>
      <WithdrawEstimate></WithdrawEstimate>
    </DepositContainer>
  );
}
