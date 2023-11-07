// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SpaceBunnies is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    string private _baseTokenURI;

    constructor(string memory name, string memory symbol, address initialOwner) Ownable(initialOwner) ERC721(name, symbol) {
        //_baseTokenURI = "ipfs://spacebunnies.io/api/token/";
        _baseTokenURI = "https://ipfs.io/ipfs/QmPVPG1rKufG9xBNTaFX2ga4VXas953b6dQLdBkWAhs3Hh";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _baseTokenURI);
        _tokenIdCounter += 1;
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /*function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }*/
}
