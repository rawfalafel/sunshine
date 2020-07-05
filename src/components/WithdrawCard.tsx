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

export default function WithdrawCard({ onBack }: { onBack: () => void }) {
  const [notes, setNotes] = useState("");
  function initiateWithdraw() {}

  function handleChange(e: { target: { value: string } }) {
    setNotes(e.target.value);
  }

  return (
    <Card>
      <StyledHeader>
        <UnstyledButton onClick={onBack}>
          <FiChevronLeft size={20} />
        </UnstyledButton>
        <StyledTitle>Withdraw from Tornado.cash</StyledTitle>
      </StyledHeader>
      <div>
        <StyledLabel>
          <p>Notes to withdraw</p>
          <textarea onChange={handleChange} value={notes} />
        </StyledLabel>
      </div>
      <Button onClick={initiateWithdraw}>Withdraw</Button>
    </Card>
  );
}
