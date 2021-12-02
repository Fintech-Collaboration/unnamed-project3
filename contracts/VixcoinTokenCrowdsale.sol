pragma solidity ^0.5.0;

import "./VixcoinTokenMintable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/crowdsale/Crowdsale.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/crowdsale/emission/MintedCrowdsale.sol";

contract VixcoinTokenSale is Crowdsale, MintedCrowdsale {
    
    constructor (
        uint rate,
        address payable wallet,
        VixcoinToken token
    ) Crowdsale(rate, wallet, token) public {
        
    }
}

contract VixcoinTokenSaleDeployer {
    address public vixcoin_sale_address;
    address public token_address;
    
    constructor (
        uint rate,
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint initial_supply,
        address payable wallet
    ) public {
        VixcoinToken token = new VixcoinToken(name, symbol, decimals, initial_supply);
        token_address = address(token);
        
        VixcoinTokenSale vixcoin_sale = new VixcoinTokenSale(rate, wallet, token);
        vixcoin_sale_address = address(vixcoin_sale);
        
        token.addMinter(vixcoin_sale_address);
        token.renounceMinter();
    }
}