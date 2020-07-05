/** @format */
// Import the withdraw proving key as a binary and export as an Array

// eslint-disable-next-line
const buffer = require("arraybuffer-loader!./withdraw_proving_key.bin");
const array = new Uint8Array(buffer);

export default array;
