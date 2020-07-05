/** @format */
import { eth } from "@burner-wallet/assets";

export function truncateAddress(address: string): string {
  return address.slice(0, 6) + "..." + address.slice(address.length - 4);
}

export function ethToUsd(balance: string) {
  return eth.getUSDValue(balance);
}
