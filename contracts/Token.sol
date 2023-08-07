// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address owner;
    
    constructor (string memory name,string memory sym) ERC20(name,sym){
        owner = msg.sender;
        _mint(address(this), 10 * (10 ** uint256(decimals())));
        _mint( msg.sender, 10000000000000000000000000000 );
    }
}