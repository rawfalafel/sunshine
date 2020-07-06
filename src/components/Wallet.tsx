/** @format */

import React from "react";
import styled from "styled-components/macro";
import colors from "../utils/colors";
import { ethToUsd } from "../utils/index";
import Address from "./Address";
import Button from "./Button";
import Card from "./Card";
import H2 from "./H2";

const StyledHeader = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid ${colors.lightGray};
`;

const StyledUSD = styled.span`
  font-size: 0.6em;
  padding-bottom: 16px;
`;

const StyledContents = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTotal = styled.h3`
  font-size: 2em;
  padding: 16px 0 0 0;
  margin: 0;
`;

const StyledToken = styled.p`
  padding: 20px 0;
`;

export default function Wallet({
  balance,
  address,
  onWithdraw,
  onSend,
}: {
  balance: string;
  address: string;
  onWithdraw: () => void;
  onSend: () => void;
}) {
  return (
    <Card>
      <StyledHeader>
        <H2>Burner Wallet</H2>
        <Address address={address} />
      </StyledHeader>
      <StyledContents>
        <StyledTotal>
          ${ethToUsd(balance)} <StyledUSD>USD</StyledUSD>
        </StyledTotal>
        <StyledToken>{balance} ETH</StyledToken>
      </StyledContents>
      <StyledButtons>
        <Button onClick={onWithdraw}>Withdraw</Button>
        <Button onClick={onSend} disabled={/* isBalanceZero(balance) */ false}>
          Send
        </Button>
      </StyledButtons>
    </Card>
  );
}
