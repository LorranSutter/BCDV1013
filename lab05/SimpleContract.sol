// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.6.6;

contract SimpleContract {
    event NewNumber(uint256 newNumber);

    uint256 private myNumber;

    constructor(uint256 seed) public {
        myNumber = random(seed);
    }

    function setNumber(uint256 newNumber) public {
        myNumber = newNumber;
        emit NewNumber(newNumber);
    }

    function setNewRandomNumber(uint256 seed) public {
        myNumber = random(seed);
        emit NewNumber(myNumber);
    }

    function getNumber() public view returns (uint256) {
        return myNumber;
    }

    function random(uint256 seed) private view returns (uint256) {
        return
            uint256(keccak256(abi.encodePacked(now, msg.sender, seed))) % 251;
    }
}
