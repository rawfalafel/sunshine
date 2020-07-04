import React, { useState } from "react";
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

const InputList = styled.section``;

const Input = styled.input`
  display: block;
`;

const WithdrawButton = styled.button``;

const WithdrawEstimate = styled.section``;

export default function Deposit(props: any) {
  const [notes, setNotes] = useState<Array<string>>([""]);

  const executeWithdraw = function () {};

  const handleChange = function (event: any, index: number) {
    const value = event.target.value;

    setNotes((notes) => {
      const notesCopy = [...notes];
      notesCopy[index] = value;

      return notesCopy;
    });
  };

  const addNote = function () {
    setNotes((notes) => notes.concat(""));
  };

  return (
    <DepositContainer>
      <Header>Sunshine.cash</Header>
      <Welcome>
        Withdraw your Tornado.cash transactions to a secure private address.
      </Welcome>
      <DepositHeader>Note(s) to withdraw</DepositHeader>
      <DepositBox>
        <InputList>
          {notes.map((note, idx) => (
            <Input
              type="text"
              key={`input_${idx}`}
              name="deposit"
              onChange={(event) => handleChange(event, idx)}
              value={note}
            />
          ))}
        </InputList>
        <button onClick={addNote}>Add Note</button>
      </DepositBox>
      <WithdrawButton onClick={() => executeWithdraw()}>
        Withdraw
      </WithdrawButton>
      <WithdrawEstimate></WithdrawEstimate>
    </DepositContainer>
  );
}
