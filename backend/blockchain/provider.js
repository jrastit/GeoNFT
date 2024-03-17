const { getDefaultProvider } = require("ethers/providers");
const { ethers } = require("ethers"); // assuming commonjs


const fs = require("fs");
provider = getDefaultProvider("https://polygon-pokt.nodies.app");
provider = getDefaultProvider("http://localhost:8545");
provider = getDefaultProvider("https://spicy-rpc.chiliz.com/");
//provider = getDefaultProvider("mainnet");
const abi = JSON.parse(fs.readFileSync("abi.json"));

let iface = new ethers.Interface(abi);

// This is the "transfer event" topic we want to watch.
const mintTopic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
// This is the "from address" we want to watch.
const zeroTopic = "0x0000000000000000000000000000000000000000000000000000000000000000";
const zeroAddress = "0x0000000000000000000000000000000000000000"
module.exports = {
    provider,
    abi,
    iface,
    mintTopic,
    zeroTopic,
    zeroAddress
};