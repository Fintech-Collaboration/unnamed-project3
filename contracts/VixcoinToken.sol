//SDPX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";


contract VixcoinToken is ERC20, ERC20Detailed, ERC20Mintable {
    address payable owner;

    constructor (
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    )
    ERC20Detailed(_name, _symbol, _decimals)
    public {
      _mint(msg.sender, 1000);
    }
    
    modifier onlyOwner {
        require(owner == msg.sender, "You are not authorized to mint.");
        _;
    }

    function mintVxcnToken(address _minter, uint _amount) public onlyOwner {
        _mint(_minter, _amount);
    }
}

