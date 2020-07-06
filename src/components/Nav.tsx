/** @format */

import React from "react";
import styled from "styled-components/macro";

const StyledNav = styled.nav`
  max-width: 1000px;
  width: 100%;
  display: flex;
  text-align: left;
  padding: 20px;
`;

const StyledH1 = styled.h1`
  text-align: left;
`;

export default function Nav() {
  return (
    <StyledNav>
      <StyledH1>Wallaroo</StyledH1>
    </StyledNav>
  );
}
