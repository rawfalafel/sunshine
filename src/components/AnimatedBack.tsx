/** @format */

import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import styled from "styled-components/macro";

const StyledChevron = styled(FiChevronLeft)`
  transition: transform 0.25s ease;
  margin-top: 2px;

  &:hover {
    transform: translate3d(-4px, 0, 0);
  }
`;

export default function AnimatedBack() {
  return <StyledChevron size={24} />;
}
