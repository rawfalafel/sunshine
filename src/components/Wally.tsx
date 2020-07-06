/** @format */

import React from "react";
import styled from "styled-components/macro";
import HomeImage from "../assets/home.png";
import SendImage from "../assets/send.png";
import WithdrawImage from "../assets/withdraw.png";

type Props = {
  marginLeft: number;
  marginTop: number;
};

const StyledImg = styled.img`
  position: absolute;
  height: 250px;
  margin-left: ${(props: Props) => props.marginLeft}px;
  margin-top: ${(props: Props) => props.marginTop}px;
`;

export default function Wally({
  view,
}: {
  view: "home" | "withdraw" | "send";
}) {
  let src = HomeImage;
  let marginLeft = -290;
  let marginTop = 0;
  if (view === "withdraw") {
    src = WithdrawImage;
    marginLeft = -350;
    marginTop = 0;
  } else if (view === "send") {
    src = SendImage;
    marginLeft = -320;
    marginTop = 40;
  }

  return (
    <StyledImg src={src} marginLeft={marginLeft} marginTop={marginTop} alt="" />
  );
}
