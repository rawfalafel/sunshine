/** @format */

import React, { useState } from "react";
import { FiChevronLeft, FiInfo } from "react-icons/fi";
import ReactTooltip from "react-tooltip";
import styled from "styled-components/macro";
import colors from "../utils/colors";
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

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 65px;
  box-sizing: border-box;
  border: 0;
  border-radius: 4px;
  background-color: ${colors.lightGray};
  padding: 12px 16px;
  margin-bottom: 16px;
`;

const StyledLabel = styled.label``;
const StyledLabelText = styled.p`
  font-size: 0.9em;
  font-weight: medium;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

export default function WithdrawCard({ onBack }: { onBack: () => void }) {
  const [notes, setNotes] = useState("");
  function initiateWithdraw() {}

  function handleChange(e: { target: { value: string } }) {
    setNotes(e.target.value);
  }

  return (
    <Card>
      <ReactTooltip place="right" />
      <StyledHeader>
        <UnstyledButton onClick={onBack}>
          <FiChevronLeft size={20} />
        </UnstyledButton>
        <H2>Withdraw from Tornado.cash</H2>
      </StyledHeader>
      <div>
        <StyledLabel>
          <StyledLabelText>
            Notes (comma-separated) &nbsp;
            <FiInfo data-tip="You'll receive a note for each deposit made in Tornado.cash." />
          </StyledLabelText>
          <StyledTextarea onChange={handleChange} value={notes} />
        </StyledLabel>
      </div>
      <Button onClick={initiateWithdraw} width="100%">
        Confirm
      </Button>
    </Card>
  );
}
