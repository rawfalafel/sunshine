/** @format */

type Withdrawal = {
  note: string;
  totalEthAmount: number;
  eta: string; // e.g. 3:45pm
  isComplete: boolean;
};

type Send = {
  ethAmount: number;
  recipientAddress: string;
  eta: string; // e.g. 3:45pm
  isComplete: boolean;
};
