const e = require("express");
const logger = require("logger");
const { provider, iface, mintTopic, zeroAddress } = require("../blockchain/provider");
const { ethers } = require("ethers"); // assuming commonjs
const { processBlock } = require("../blockchain/process_block");



function watchNode(provider) {
    provider.on("block", async (n) => {
        processBlock(provider, n);
    });
}

module.exports = {
    watchNode
};


