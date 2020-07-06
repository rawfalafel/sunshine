/** @format */

import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import styled from "styled-components/macro";
import { truncateAddress } from "../utils";
import colors from "../utils/colors";

const StyledAddress = styled.button`
  border: 1px solid ${colors.lightGray};
  padding: 0px 16px;
  border-radius: 16px;
  width: 40px;
`;

const StyledPre = styled.pre`
  padding: 0;
  margin: 0;
`;

export default function Address({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  return (
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
  );
}
