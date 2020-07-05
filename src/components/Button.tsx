/** @format */

import React from "react";

export default function Button({
  children,
  onClick,
  disabled = false,
  ...props
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
}
