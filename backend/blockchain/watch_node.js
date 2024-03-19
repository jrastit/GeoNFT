const e = require("express");
const logger = require("logger");
const { provider, iface, mintTopic, zeroAddress } = require("../blockchain/provider");
const { ethers } = require("ethers"); // assuming commonjs
const axios = require("axios");
const NFT = require("../models/nft");
const GeoNFT = require("../models/geo_nft");

function extractInfoFromJSON(json, nftId) {
    let name = json.name;
    let description = json.description;
    let image = json.image;
    let url = json.url;
    let location = json.location;
    nftObj = {
        name: name,
        description: description,
        image: image && image.startsWith("data:") ? "data": image,
        url: url,
        location: location,
        status: "active",
    }
    GeoNFT.findOne({ where: { id : nftId }})
    .then(function(geonft) {
        if (geonft) {
            geonft.update(nftObj);
            NFT.findOne({ where: { id : nftId }}).then(function(nft) {
                if (nft) {
                    nft.update({
                        status: "ok",
                    });
                }
            });
        } else {
            GeoNFT.create(nftObj);
            NFT.findOne({ where: { id : nftId }}).then(function(nft) {
                if (nft) {
                    nft.update({
                        status: "ok",
                    });
                }
            });
        }   
        
    })

}

function getJsonFromURL(url, nftId) {
    axios.get(url).then(response => {
                        const json = response.data;
                        //console.log("JSON content:", json);
                        extractInfoFromJSON(json, nftId);
                    })
                    .catch(error => {
                        console.error("Error fetching JSON from URL:", url);
                        NFT.findOne({ where: { id : nftId }}).then(function(nft) {
                            if (nft) {
                                nft.update({
                                    status: "404",
                                });
                            }
                        });
                    });
}

function URItoJSON(uri, nftId) {
    if (uri.startsWith("data:")) {
        //console.log("is data URI");
        data = uri.substring(5);
        if (data.startsWith("application/json;base64,")) {
            //console.log("is json 64");
            json_b64_data = data.substring(24);
            let json_data = Buffer.from(json_b64_data, 'base64').toString('utf-8');
            let json = JSON.parse(json_data);
            extractInfoFromJSON(json, nftId);
            //console.log("NFT JSON:", json);
        }
    } else if (uri.startsWith("ipfs://")) {
        const ipfsHash = uri.substring(7);
        const httpsURI = `https://ipfs.io/ipfs/${ipfsHash}`;
        
        //console.log("is https URI:", httpsURI);
        getJsonFromURL(httpsURI, nftId);
    } else if (uri.startsWith("https://")) {
        //console.log("is https URI");
        getJsonFromURL(uri, nftId);
    } else if (uri.startsWith("http://")) {
        //console.log("is http URI");
        getJsonFromURL(uri, nftId);
    } else {
        console.error("Invalid NFT URI:", uri.substring(10));
    }
}

function getURI(provider, contractAddress, nftId) {
    let data = iface.encodeFunctionData('tokenURI', [nftId]);

    provider.call({ to: contractAddress, data: data }).then((result) => {
        let uri_obj = iface.decodeFunctionResult('tokenURI', result);
        uri = uri_obj.toString();

        mintNft(provider, contractAddress, nftId, uri);
    }).catch((error) => {
        mintNftError(provider, contractAddress, nftId, uri);
    });
}

function mintNft(provider, contractAddress, nftId, uri) {
    // Create a new NFT entry in the database
    console.log("Minting NFT:", provider.chainId, contractAddress, nftId);
    NFT.create({
        chain_id : 137,
        contract_address : contractAddress,
        nft_id : nftId,
        uri : uri.startsWith("data:") ? "data": uri,
        status : "init",
    })
    .then((nft) => {
        URItoJSON(uri, nft.id);
    })
    .catch((error) => {
        console.error("Error pushing NFT to database:", error);
    });
}

function mintNftError(provider, contractAddress, nftId) {
    // Create a new NFT entry in the database
    console.log("Minting NFT:", provider.chainId, contractAddress, nftId);
    NFT.create({
        chain_id : 137,
        contract_address : contractAddress,
        nft_id : nftId,
        status : "error",
    })
    .then((nft) => {
        console.error("Error invalid NFT:", nft.id);
    })
    .catch((error) => {
        console.error("Error pushing NFT to database:", error);
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
                                        if (mylog.args[2] < 4294967296)
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


