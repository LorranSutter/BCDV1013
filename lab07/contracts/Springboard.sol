pragma solidity ^0.5.0;

contract Springboard {
  bool _mutex;
  bytes _pendingRuntimeCode;
  
  // this article explains how bootstrapCode is generated
  // https://blog.ricmoo.com/wisps-the-magical-world-of-create2-5c2177027604
  //
  // It is slightly modified from the original to check for staticcall result and use returndatacopy
  // scripts/bootstrap - contains the bytecodes breakdown
  // scripts/assemble.js - assemble the bootstrap bytecodes
  bytes public bootstrapCode = hex"6394198df1600052600060006004601c335afa80601b57600080fd5b3d600060203e6040516060f3";
  
  event ContractCreated(address);
  
  function execute(bytes memory runtimeCode) public payable {
    require(!_mutex);
    _mutex = true;
      
    // Store the desired runtime bytecode
    _pendingRuntimeCode = runtimeCode;
    
    bytes memory initCode = bootstrapCode;
    bytes32 salt = keccak256(abi.encodePacked(msg.sender));
    address addr;
    
    // Create the new contract
    assembly {
      addr := create2(0, add(initCode, 0x20),
                      mload(initCode), salt)
      if iszero(extcodesize(addr)) { revert(0, 0) }
    }

    emit ContractCreated(addr);
    _mutex = false;
  }
 

  // This function is called by the new contract during the create2 call
  // from the bootstrap, fetching the desired bytecode
  function getPendingRuntimeCode() public view returns
                                   (bytes memory runtimeCode) {
    return _pendingRuntimeCode;
  }
}
