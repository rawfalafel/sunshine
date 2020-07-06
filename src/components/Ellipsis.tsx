/** @format */

import React from "react";

export default function Ellipsis({ size }: { size?: number }) {
  return (
    <svg
      style={{
        margin: "auto",
        display: "block",
        shapeRendering: "auto",
      }}
      width={`${size || 50}px`}
      height={`${size || 50}px`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="84" cy="50" r="3.67053" fill="#d4ecc9">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="0.641025641025641s"
          calcMode="spline"
          keyTimes="0;1"
          values="10;0"
          keySplines="0 0.5 0.5 1"
          begin="0s"
        ></animate>
        <animate
          attributeName="fill"
          repeatCount="indefinite"
          dur="2.564102564102564s"
          calcMode="discrete"
          keyTimes="0;0.25;0.5;0.75;1"
          values="#d4ecc9;#c3d582;#75b34c;#a2d895;#d4ecc9"
          begin="0s"
        ></animate>
      </circle>
      <circle cx="16" cy="50" r="6.3291" fill="#d4ecc9">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2.564102564102564s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2.564102564102564s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        ></animate>
      </circle>
      <circle cx="37.5189" cy="50" r="10" fill="#BED95F">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2.564102564102564s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.641025641025641s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2.564102564102564s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.641025641025641s"
        ></animate>
      </circle>
      <circle cx="71.519" cy="50" r="10" fill="#72A603">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2.564102564102564s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.282051282051282s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2.564102564102564s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.282051282051282s"
        ></animate>
      </circle>
      <circle cx="16" cy="50" r="0" fill="#EAF2AE">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2.564102564102564s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.923076923076923s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2.564102564102564s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.923076923076923s"
        ></animate>
      </circle>
    </svg>
  );
}
