/** @format */

import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import styled from "styled-components/macro";
import Button from "./Button";
import Card from "./Card";
import UnstyledButton from "./UnstyledButton";

const StyledTitle = styled.h2`
  margin: 0;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLabel = styled.label``;

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
          <FiChevronLeft size={20} />
        </UnstyledButton>
        <StyledTitle>Send from private wallet</StyledTitle>
      </StyledHeader>
      <div>
        <StyledLabel>
          <p>Amount</p>
          <input
            onChange={handleAmountChange}
            value={amount}
            placeholder="0.0"
          />{" "}
          ETH
        </StyledLabel>
        <StyledLabel>
          <p>Recipient Address</p>
          <input
            onChange={handleAddressChange}
            value={address}
            placeholder="0x"
          />
        </StyledLabel>
      </div>
      <Button onClick={initiateWithdraw}>Send</Button>
    </Card>
  );
}
