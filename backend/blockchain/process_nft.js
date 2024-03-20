const { iface } = require("../blockchain/provider");
const NFT = require("../models/nft");
const { URItoJSON } = require("./process_nft_json");

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

async function mintNft(provider, contractAddress, nftId, uri) {
    // Create a new NFT entry in the database
    console.log("Minting NFT:", provider.chainId, contractAddress, nftId);
    NFT.create({
        chain_id : (await provider.getNetwork()).chainId,
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

async function mintNftError(provider, contractAddress, nftId) {
    // Create a new NFT entry in the database
    console.log("Minting NFT:", provider.chainId, contractAddress, nftId);
    NFT.create({
        chain_id : (await provider.getNetwork()).chainId,
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

module.exports = {
    getURI,
}