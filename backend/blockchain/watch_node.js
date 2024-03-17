const e = require("express");
const logger = require("logger");
const { provider, iface, mintTopic, zeroAddress } = require("../blockchain/provider");
const { ethers } = require("ethers"); // assuming commonjs
const axios = require("axios");

function getJsonFromURL(url) {
    axios.get(url).then(response => {
                        const json = response.data;
                        console.log("JSON content:", json);
                        // Do something with the JSON content
                    })
                    .catch(error => {
                        console.error("Error fetching JSON:", error);
                    });
}

function getURI(provider, contractAddress, nftId) {
    let data = iface.encodeFunctionData('tokenURI', [nftId]);

    
    // Make the call
    provider.call({ to: contractAddress, data: data }).then((result) => {
        // Decode the result
        let uri_obj = iface.decodeFunctionResult('tokenURI', result);
        uri = uri_obj.toString();
        //console.log("NFT URI:", uri);
        if (typeof uri === "string") {
            if (uri.startsWith("data:")) {
                console.log("is data URI");
                data = uri.substring(5);
                if (data.startsWith("application/json;base64,")) {
                    console.log("is json 64");
                    json_b64_data = data.substring(24);
                    let json_data = Buffer.from(json_b64_data, 'base64').toString('utf-8');
                    let json = JSON.parse(json_data);
                    //console.log("NFT JSON:", json);
                }
            } else if (uri.startsWith("ipfs://")) {
                const ipfsHash = uri.substring(7);
                const httpsURI = `https://ipfs.io/ipfs/${ipfsHash}`;
                
                console.log("is https URI:", httpsURI);
                getJsonFromURL(httpsURI);
            } else if (uri.startsWith("https://")) {
                console.log("is https URI");
                getJsonFromURL(uri);
            } else if (uri.startsWith("http://")) {
                console.log("is http URI");
                getJsonFromURL(uri);
            } else {
                console.error("Invalid NFT URI:", uri.substring(10));
            }
        } else {
            console.error("Invalid NFT URI type:", typeof uri);
        }

    }).catch((error) => {
        console.error("Error getting NFT URI:", error);
    });
}

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
                                        getURI(provider, log.address, mylog.args[2]);
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


