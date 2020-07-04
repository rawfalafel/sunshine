const NativeAsset = require('./NativeAsset');

module.exports = new NativeAsset({
  id: 'eth',
  name: 'ETH',
  network: '1',
  priceSymbol: 'ETH',
  icon: 'https://static.burnerfactory.com/icons/eth.svg',
  pollInterval: 60 * 60 * 1000, // 60 minutes
});
