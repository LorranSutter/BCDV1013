// SPDX-License-Identifier: MIT

// contracts/Counter.sol
pragma solidity ^0.6.0;

import "@openzeppelin/contracts-ethereum-package/contracts/GSN/GSNRecipient.sol";

contract Counter is GSNRecipientUpgradeSafe{
    uint256 public value;

    function increase() public {
        value += 1;
    }

    function acceptRelayedCall(
        address relay,
        address from,
        bytes calldata encodedFunction,
        uint256 transactionFee,
        uint256 gasPrice,
        uint256 gasLimit,
        uint256 nonce,
        bytes calldata approvalData,
        uint256 maxPossibleCharge
    ) external override view returns (uint256, bytes memory) {
        return _approveRelayedCall();
    }

    // We won't do any pre or post processing, so leave _preRelayedCall and _postRelayedCall empty
    function _preRelayedCall(bytes memory context) internal override returns (bytes32) {
    }

    function _postRelayedCall(bytes memory context, bool, uint256 actualCharge, bytes32) internal override {
    }

    function initialize(address newRelayHub) public {
        _upgradeRelayHub(newRelayHub);
    }
}

// Instance created at 0x83495C0cB27A9f925970b4DdfA27E05260856657, 0x83495C0cB27A9f925970b4DdfA27E05260856657

// -RelayHubAddress 0xd216153c06e857cd7f72665e0af1d7d82172f494

// Relayhub addr : 0xD216153c06E857cD7f72665E0aF1d7D82172F494

// 0xd216153c06e857cd7f72665e0af1d7d82172f494

// 0x83495c0cb27a9f925970b4ddfa27e05260856657

// 0x4aa485c2075659f2fe27ece77487a481c5c62d0c

// 0x62c86e1de6216b32ae8af153ae44ef6939b

// key extracted. addr: 0x09A00D5F4C3a48DCAae8d8f2604e1A0Dd22905a2

// relay server address:  0x09A00D5F4C3a48DCAae8d8f2604e1A0Dd22905a2

// RelayHttpServer.go:131: address 0x09A00D5F4C3a48DCAae8d8f2604e1A0Dd22905a2 sent

// RelayHttpServer.go:131: address 0x09A00D5F4C3a48DCAae8d8f2604e1A0Dd22905a2 sent