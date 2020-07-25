// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;


contract MySmartContract {
    uint32 public counter;
    address private owner;
    bool private stopped;

    /**
    @dev Enforces the caller to be the contract's owner.
    */
    modifier isOwner {
        require(msg.sender == owner, "Sender is not owner.");
        _;
    }

    /**
    @dev Allows transaction only if the contract is not stopped.
    */
    modifier isStopped {
        require(!stopped, "Contract is stopped.");
        _;
    }

    constructor(uint32 _counter) public {
        counter = _counter; // Allows setting counter's initial value on deployment.
        // Sets the contract's owner as the address that deployed the contract.
        owner = msg.sender;
    }

    /**
    @notice Increments the contract's counter if contract is active.
    @dev It will revert is the contract is stopped. Create a modifier "isNotStopped"
    */
    function incrementCounter() public isStopped {
        counter++; // Fixes bug introduced in version 1.
    }

    /**
    @notice Toggle between contract stopped and not stopped.
    */
    function toggleContractStopped() public isOwner {
        stopped = !stopped;
    }
}
