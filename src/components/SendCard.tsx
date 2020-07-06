/** @format */

import React, { useState } from "react";
import styled from "styled-components/macro";
import colors from "../utils/colors";
import AnimatedBack from "./AnimatedBack";
import Button from "./Button";
import Card from "./Card";
import H2 from "./H2";
import UnstyledButton from "./UnstyledButton";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid ${colors.lightGray};
  margin-bottom: 24px;
`;

const StyledLabel = styled.label`
  margin-bottom: 24px;
  display: block;
`;

const StyledLabelText = styled.p`
  font-size: 0.9em;
  font-weight: medium;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 0;
  background-color: ${colors.lightGray};
  padding: 12px 16px;
  font-size: 1.2em;
`;

const StyledFlex = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTokenLabel = styled.p`
  margin-left: 12px;
`;

export default function SendCard({ onBack }: { onBack: () => void }) {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  function initiateWithdraw() {}

  function handleAmountChange(e: { target: { value: string } }) {
    setAmount(e.target.value);
  }

  function handleAddressChange(e: { target: { value: string } }) {
    setAddress(e.target.value);
  }

  return (
    <Card>
      <StyledHeader>
        <UnstyledButton onClick={onBack}>
          <AnimatedBack />
        </UnstyledButton>
        <H2>Send from private wallet</H2>
      </StyledHeader>
      <div>
        <StyledLabel>
          <StyledLabelText>Amount</StyledLabelText>
          <StyledFlex>
            <StyledInput
              onChange={handleAmountChange}
              value={amount}
              placeholder="0.0"
            />{" "}
            <StyledTokenLabel>ETH</StyledTokenLabel>
          </StyledFlex>
        </StyledLabel>
        <StyledLabel>
          <StyledLabelText>Recipient Address</StyledLabelText>
          <StyledInput
            onChange={handleAddressChange}
            value={address}
            placeholder="0x"
          />
        </StyledLabel>
      </div>
      <Button onClick={initiateWithdraw} width="100%">
        Confirm
      </Button>
    </Card>
  );
}
