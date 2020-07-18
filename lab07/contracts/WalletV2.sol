pragma solidity ^0.5.0;

contract WalletV2 {

    function die() public {
        selfdestruct(address(0));
    }

    function version() public pure returns (string memory ver) {
       return "2.0";
    }
}
