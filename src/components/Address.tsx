/** @format */

import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import styled from "styled-components/macro";
import { truncateAddress } from "../utils";
import colors from "../utils/colors";

const StyledAddress = styled.button`
  border: 1px solid ${colors.lightGray};
  padding: 12px 16px;
  border-radius: 16px;
  width: 160px;
  background: none;
  display: flex;
  justify-content: flex-end;
  background: ${(props: { copied: boolean }) =>
    props.copied ? colors.yellowGreen : "none"};

  &:hover,
  :active {
    background-color: ${colors.yellowGreen};
    border-color: ${colors.yellowGreen};
  }
`;

const StyledPre = styled.pre`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
`;

export default function Address({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <CopyToClipboard
        text={address}
        onCopy={() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
      >
        <StyledAddress copied={copied}>
          <StyledPre>
            {copied ? "Copied!" : truncateAddress(address)} <FiCopy />
          </StyledPre>
        </StyledAddress>
      </CopyToClipboard>
    </div>
  );
}
