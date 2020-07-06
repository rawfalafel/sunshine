/** @format */

import React from "react";
import styled from "styled-components/macro";
import colors from "../utils/colors";

const StyledButton = styled.button`
  background: ${colors.green};
  border-radius: 4px;
  color: white;
  width: ${(props: { width: string | undefined }) => props.width || "160px"};

  padding: 12px 16px;
  border: 0;
  font-family: "Ubuntu";
  font-weight: bold;

  &:disabled {
    background: ${colors.mediumGray};
  }

  &:hover {
    background-color: ${colors.darkGreen};
  }
`;

export default function Button({
  children,
  onClick,
  width,
  disabled = false,
  ...props
}: {
  children: React.ReactNode;
  onClick: () => void;
  width?: string | undefined;
  disabled?: boolean;
}) {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      width={width}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
