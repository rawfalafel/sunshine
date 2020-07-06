/** @format */

import React from "react";
import styled from "styled-components/macro";
import colors from "../utils/colors";

const StyledNav = styled.nav`
  max-width: 840px;
  width: 100%;
  display: flex;
  text-align: left;
  padding: 20px;
  color: ${colors.darkGreen};
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
