const { getDefaultProvider } = require("ethers/providers");
const { ethers, JsonRpcProvider, Network } = require("ethers"); // assuming commonjs


const fs = require("fs");
const network = new Network("Polygon", 137);
provider = new JsonRpcProvider("https://polygon-pokt.nodies.app", network);
//provider = getDefaultProvider("http://localhost:8545");
//provider = getDefaultProvider("https://spicy-rpc.chiliz.com/");
//provider = getDefaultProvider("https://arbitrum-nova.drpc.org");
// provider = getDefaultProvider("https://nova.arbitrum.io/rpc");
// provider = getDefaultProvider("https://arbitrum-nova.public.blastapi.io");
//provider = getDefaultProvider("mainnet");
const token = JSON.parse(fs.readFileSync("token.json"));

let iface = new ethers.Interface(token.output.abi);

// This is the "transfer event" topic we want to watch.
const mintTopic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
// This is the "from address" we want to watch.
const zeroTopic = "0x0000000000000000000000000000000000000000000000000000000000000000";
const zeroAddress = "0x0000000000000000000000000000000000000000"
module.exports = {
    provider,
    iface,
    mintTopic,
    zeroTopic,
    zeroAddress
};