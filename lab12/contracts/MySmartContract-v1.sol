// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

/**
 * @dev Renamed version 1 to MySmartContractV1 to quickly workaround Truffle's singleton feature when deploying contracts.
 * This allows us to have both contract versions deployed at the same time.
 */
contract MySmartContractV1 {
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

    constructor() public {
        counter = 0;
        // Sets the contract's owner as the address that deployed the contract.
        owner = msg.sender;
    }

    /**
    @notice Increments the contract's counter if contract is active.
    @dev It should revert if the contract is stopped. Create a modifier named "isNotStopped"
    */
    function incrementCounter() public isStopped {
        counter += 2; // This is an intentional bug.
    }

    /**
    @notice Toggle between contract stopped and not stopped.
    */
    function toggleContractStopped() public isOwner {
        stopped = !stopped;
    }
}
