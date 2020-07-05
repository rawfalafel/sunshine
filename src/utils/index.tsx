/** @format */

export function truncateAddress(address: string): string {
  return address.slice(0, 6) + "..." + address.slice(address.length - 4);
}

export function ethToUsd(balance: string) {
  // TODO(@yutaro): Fix this so the USD value is actually loaded
  return 0; // eth.getUSDValue(balance);
}
