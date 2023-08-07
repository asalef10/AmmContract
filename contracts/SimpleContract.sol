// contracts/SimpleContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    uint256 private value;

    constructor() {
        value = 0;
    }

    function setValue(uint256 _newValue) external {
        value = _newValue;
    }

    function getValue() external view returns (uint256) {
        return value;
    }
}
