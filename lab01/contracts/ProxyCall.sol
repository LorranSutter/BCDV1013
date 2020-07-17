pragma solidity ^0.5.0;

contract ProxyCall {
    address public owner;
    address public delegate; // contract to delegate calls to

    event LogResult(bytes result);

    constructor(address delegateAddress) public {
        owner = msg.sender;
        delegate = delegateAddress;
    }

    function() external {
        (bool success, bytes memory returnData) = delegate.call(msg.data);
        require(success, "external call failed");
        emit LogResult(returnData);
    }
}