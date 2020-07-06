/** @format */

import React from "react";
import styled from "styled-components/macro";

const StyledH2 = styled.h2`
  font-weight: 300;
  margin: 0;
`;

export default function H2({ children }: { children: React.ReactNode }) {
  return <StyledH2>{children}</StyledH2>;
}
