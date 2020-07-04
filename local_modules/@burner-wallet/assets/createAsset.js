module.exports.ERC20Asset = require('./ERC20Asset');
module.exports.ERC777Asset = require('./ERC777Asset');
module.exports.NativeAsset = require('./NativeAsset');

const createAsset = ({ type, ...config }) => {
  if (type === 'erc20') {
    return new ERC20Asset(config);
  }
  if (type === 'erc777') {
    return new ERC777Asset(config);
  }
  if (type === 'native') {
    return new NativeAsset(config);
  }
  throw new Error(`Unknown asset type "${type}"`);
}

module.exports = createAsset;
