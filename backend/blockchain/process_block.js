const { iface, mintTopic, zeroAddress } = require("../blockchain/provider");
const BLOCK = require("../models/block.js");

const { getURI } = require("./process_nft.js");

async function processLog(provider, log) {
    if (log.topics && log.topics[0] === mintTopic && log.topics.length === 4) {
        //console.log("Mint event found");
        try {
            let mylog = iface.parseLog(log);
            if (mylog.args[0] === zeroAddress) {
                console.log(log.address, "Mint", mylog.args[1], mylog.args[2]);
                if (mylog.args[2] < 4294967296) {
                    getURI(provider, log.address, mylog.args[2]);
                    return {
                        nft_mint : 1,
                    }
                }
                else {
                    console.error("Invalid NFT ID:", mylog.args[2]);
                    return {
                        nft_error_id : 1,
                    }
                }
            } else {
                console.log(log.address, "Transfer", mylog.args[0], mylog.args[1], mylog.args[2]);
                return {
                    nft_transfer : 1,
                }
            }
        } catch (e) {
            console.error(txHash, log.data);
            console.error(e);
            return {
                error : 1,
            }
        }
    }
    return {}
}


async function processTransaction(provider, txHash) {
    receipt = await provider.getTransactionReceipt(txHash)
    res = {
        logs: receipt?.logs?.length ?? 0,
    }
    if (receipt?.logs) {
        result_log = await Promise.all(
            receipt.logs.map(async (log) => processLog(provider, log)
            ));
        return {
            logs: res.logs,
            nft_mint: result_log.reduce((n, { nft_mint }) => n + (nft_mint ?? 0), 0),
            nft_transfer: result_log.reduce((n, { nft_transfer }) => n + (nft_transfer ?? 0), 0),
            nft_error_id: result_log.reduce((n, { nft_error_id }) => n + (nft_error_id ?? 0), 0),
            error: result_log.reduce((n, { error }) => n + (error ?? 0), 0),
        }
    }
    return res;
}

function processBlock(provider, n) {
    provider.getBlock(n).then(async (block) => {
        if (block) {
            result = await BLOCK.create({
                chain_id: (await provider.getNetwork()).chainId,
                block_id: n,
                status: "init",
            }).then(async (db_block) => {
                console.log("Block", block.number.toString());
                result_tx = await Promise.all(
                    block?.transactions.map(async (txHash) => processTransaction(provider, txHash)));
                const res_block = {
                    transactions: block?.transactions?.length ?? 0,
                    logs: result_tx.reduce((n, { logs }) => n + (logs ?? 0), 0),
                    nft_mint: result_tx.reduce((n, { nft_mint }) => n + (nft_mint ?? 0), 0),
                    nft_transfer: result_tx.reduce((n, { nft_transfer }) => n + (nft_transfer ?? 0), 0),
                    nft_error_id: result_tx.reduce((n, { nft_error_id }) => n + ( nft_error_id ?? 0), 0),
                    error: result_tx.reduce((n, { error }) => n + (error ?? 0), 0),
                }
                db_block.transactions_count = res_block.transactions;
                db_block.logs_count = res_block.logs;
                db_block.nft_mint_count = res_block.nft_mint;
                db_block.nft_transfer_count = res_block.nft_transfer;
                db_block.nft_error_id_count = res_block.nft_error_id;
                db_block.error_count = res_block.error;
                db_block.status = "ok";
                db_block.save();
                return res_block;
            }).catch((error) => {
                console.error("Error pushing block to database:", error);
            });
            console.log(result);
        } else {
            console.error("Block not found");
            BLOCK.create({
                chain_id: (await provider.getNetwork()).chainId,
                block_id: n,
                status: "error",
            })
        }
    }).catch((error) => {
        console.error("Error getting block:", error);
    });
}

module.exports = {
    processBlock,
}