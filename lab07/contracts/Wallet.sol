pragma solidity ^0.5.0;

contract Wallet {

    function die() public {
        selfdestruct(address(0));
    }

    function version() public pure returns (string memory ver) {
       return "1.0";
    }
}
