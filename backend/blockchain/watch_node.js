const e = require("express");
const logger = require("logger");
const { provider, iface, mintTopic, zeroAddress } = require("../blockchain/provider");
function watchNode(provider) {
    provider.on("block", async (n) => {
        const block = await provider.getBlock(n);
        if (block) {  
            console.log("Block", block.number.toString());
            block.transactions.forEach(async (txHash) => {
                //const tx = await provider.getTransaction(txHash);
                //console.log(tx);
                provider.getTransactionReceipt(txHash).then((receipt) => {
                    if (receipt?.logs) {
                        let i = 0;
                        receipt.logs.forEach((log) => {
                            if (log.topics && log.topics[0] === mintTopic && log.topics.length === 4) {
                                //console.log("Mint event found");
                                try {
                                    let mylog = iface.parseLog(log);
                                    if (mylog.args[0] === zeroAddress) {
                                        console.log(log.address, "Mint", mylog.args[1], mylog.args[2]);
                                    } else {
                                        console.log(log.address, "Transfer", mylog.args[0], mylog.args[1], mylog.args[2]);
                                    }
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
}

module.exports = {
    watchNode
};


