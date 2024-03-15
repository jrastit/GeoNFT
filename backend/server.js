const { getDefaultProvider } = require("ethers/providers");
const { ethers } = require("ethers"); // assuming commonjs

const logger = require("logger");
const fs = require("fs");
provider = getDefaultProvider("https://polygon-pokt.nodies.app");
//provider = getDefaultProvider("mainnet");
const abi = JSON.parse(fs.readFileSync("abi.json"));

let iface = new ethers.Interface(abi);

// This is the "transfer event" topic we want to watch.
const mintTopic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
// This is the "from address" we want to watch.
const zeroTopic = "0x0000000000000000000000000000000000000000000000000000000000000000";

filter = {
    topics: [mintTopic, zeroTopic],
}

provider.on("block", async (n) => {

    const block = await provider.getBlock(n);

    if (block) {  
    console.log(block.number.toString());

    block.transactions.forEach(async (txHash) => {
        //const tx = await provider.getTransaction(txHash);
        //console.log(tx);
        provider.getTransactionReceipt(txHash).then((receipt) => {
            if (receipt?.logs) {
                i = 0;
                receipt.logs.forEach((log) => {
                    if (log.topics && log.topics[0] === mintTopic && log.topics[1] === zeroTopic) {
                        console.log("Mint event found");
                        try {
                            let mylog = iface.parseLog(log);
                            console.log(mylog);
                        } catch (e) {
                            console.error(txHash, i, log.data);
                            console.error(e);
                        }
                    }
                    i++;
                });
            }
            //console.log(receipt);
        })
    });
    } else {    
        console.log("No block found");
    }
});
