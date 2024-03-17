const express = require('express');
const fs = require('fs');
const path = require('path');
const { DataTypes } = require('sequelize');
const router = express.Router();


// Function to write JSON file with NFT metadata
function writeNFTMetadata(metadata, nftId, chainId, contractId) {
    const publicDir = path.join(__dirname, '../../../public');
    const chainDir = path.join(publicDir, chainId.toString());
    const contractDir = path.join(chainDir, contractId.toString());
    const destinationPath = path.join(contractDir, nftId + '.json');
    
    // Create the chain directory if it doesn't exist
    if (!fs.existsSync(chainDir)) {
        fs.mkdirSync(chainDir);
    }
    
    // Create the contract directory if it doesn't exist
    if (!fs.existsSync(contractDir)) {
        fs.mkdirSync(contractDir);
    }

    // Convert metadata to JSON string
    const jsonData = JSON.stringify(metadata, null, 2);

    // Write JSON data to file
    fs.writeFileSync(destinationPath, jsonData);

}

// Usage example
function updateNFTMetadata(nftName, description, position, url, nftId, chainId, contractId){
    const nftMetadata = {
        name: nftName,
        description: description,
        position: position,
        url: url,
        image: `https://geonft.fexhu.com/${chainId}/${contractId}/${nftId}.png`,
    };
    writeNFTMetadata(nftMetadata, nftId, chainId, contractId);
}

function updateNFTImage(imagePath, chainId, contractId, nftId) {
    const publicDir = path.join(__dirname, '../../../public');
    const chainDir = path.join(publicDir, chainId.toString());
    const contractDir = path.join(chainDir, contractId.toString());
    const destinationPath = path.join(contractDir, nftId + '.png');
    
    // Create the chain directory if it doesn't exist
    if (!fs.existsSync(chainDir)) {
        fs.mkdirSync(chainDir);
    }
    
    // Create the contract directory if it doesn't exist
    if (!fs.existsSync(contractDir)) {
        fs.mkdirSync(contractDir);
    }
    
    // Copy the image file to the destination path
    fs.copyFileSync(imagePath, destinationPath);
    
}

// Usage example
router.post('/mint', async (req, res) => {
    try {
        // Get the required data from the request body
        const { nftName, description, position, url } = req.body;

        // Create the NFT metadata object
        const nftMetadata = {
            nftName,
            description,
            position,
            url,
            image: `https://geonft.fexhu.com/${chainId}/${contractId}/${nftId}.png`
        };

        // Create the NFT record in the database
        const nft = await NFT.create(nftMetadata);

        // Write the NFT metadata to a JSON file
        updateNFTMetadata(nftName, description, position, url, nft.id, chainId, contractId);
        updateNFTImage(imagePath, chainId, contractId, nft.id);

        // Send a success response
        res.status(200).json({ message: 'NFT minted successfully!' });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Failed to mint NFT.' });
    }
});
router.post('/mint', (req, res) => {
    // Get the required data from the request body
    const { nftName, description, position, url } = req.body;

    // Create the NFT metadata object
    const nftMetadata = {
        name: nftName,
        description: description,
        position: position,
        url: url,
        image: `https://geonft.fexhu.com/${chainId}/${contractId}/${nftId}.png`,
    };

    // Write the NFT metadata to a JSON file
    updateNFTMetadata(nftName, description, position, url, nftId, chainId, contractId);
    updateNFTImage(imagePath, chainId, contractId, nftId);
    // Send a success response
    res.status(200).json({ message: 'NFT minted successfully!' });
});

module.exports = router;