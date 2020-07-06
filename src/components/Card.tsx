/** @format */

import React from "react";
import styled from "styled-components/macro";

const StyledCard = styled.section`
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 20px;
  width: 400px;
  min-height: 250px;
  box-sizing: border-box;
  background-color: white;
`;

export default function Card({ children }: { children: React.ReactNode }) {
  return <StyledCard>{children}</StyledCard>;
}
