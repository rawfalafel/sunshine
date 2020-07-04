/** @format */
/**
 * These custom assets are copies of those included in @burner-wallet/assets,
 * but with a longer poll interval to prevent rate limiting by Infura.
 */

import { ERC20Asset, NativeAsset } from "@burner-wallet/assets";

export const pollIntervalMs = 60000; // 1 minute

export const dai = new ERC20Asset({
  id: "dai",
  name: "Dai",
  network: "1",
  address: "0x6b175474e89094c44da98b954eedeac495271d0f",
  usdPrice: 1,
  icon: "https://static.burnerfactory.com/icons/mcd.svg",
  pollInterval: pollIntervalMs,
});

export const eth = new NativeAsset({
  id: "eth",
  name: "ETH",
  network: "1",
  priceSymbol: "ETH",
  icon: "https://static.burnerfactory.com/icons/eth.svg",

  // @ts-ignore: The type definition for NativeAssetConstructor
  // erroneously does not include pollInterval
  pollInterval: pollIntervalMs,
});
