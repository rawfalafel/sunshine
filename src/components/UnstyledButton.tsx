/** @format */

import React from "react";
import styled from "styled-components/macro";

const StyledButton = styled.button`
  border: 0;
  background: none;
  cursor: pointer;
`;

export default function UnstyledButton(props: any) {
  return <StyledButton {...props} />;
}
