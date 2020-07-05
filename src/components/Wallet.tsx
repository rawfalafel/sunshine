/** @format */

import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import styled from "styled-components/macro";
import colors from "../utils/colors";
import { ethToUsd, truncateAddress } from "../utils/index";
import Button from "./Button";
import Card from "./Card";

const StyledHeader = styled.section`
  display: flex;
  justify-content: space-between;
`;

const StyledAddress = styled.button`
  border: 1px solid ${colors.lightGray};
  padding: 12px 16px;
  border-radius: 16px;
`;

const StyledPre = styled.pre`
  padding: 0;
  margin: 0;
`;

const StyledContents = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTotal = styled.h3``;

const StyledToken = styled.p``;

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
  const [copied, setCopied] = useState(false);

  return (
    <Card>
      <StyledHeader>
        <h2>Private Wallet</h2>
        <CopyToClipboard
          text={address}
          onCopy={() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        >
          <StyledAddress>
            <StyledPre>
              {copied ? "Address copied!" : truncateAddress(address)} <FiCopy />
            </StyledPre>
          </StyledAddress>
        </CopyToClipboard>
      </StyledHeader>
      <StyledContents>
        <StyledTotal>${ethToUsd(balance)} USD</StyledTotal>
        <StyledToken>{balance} ETH</StyledToken>
      </StyledContents>
      <StyledButtons>
        <Button onClick={onWithdraw}>Withdraw</Button>
        <Button onClick={onSend} disabled={parseInt(balance) === 0}>
          Send
        </Button>
      </StyledButtons>
    </Card>
  );
}
