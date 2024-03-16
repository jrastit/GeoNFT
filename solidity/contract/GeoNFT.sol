// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.2/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts@5.0.2/utils/Strings.sol";

contract GeoNFT is ERC721, ERC721Burnable, Ownable {
    using Strings for uint256;
    using Strings for uint160;
    string public base; 

    constructor(address initialOwner)
        ERC721("GeoNFT", "GEO")
        Ownable(initialOwner)
    {
        string memory contract_address = Strings.toHexString(uint256(uint160(msg.sender)), 20);
        base = string(abi.encodePacked("https://geonft.fexhu.com/nft/", block.chainid.toString(), '/', contract_address, '/'));
    }

    function _baseURI() internal view override returns  (string memory) {
        return base;
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}
