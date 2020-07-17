pragma solidity >0.5.0;

contract Storage {
    bytes4 bytes4data = 0xaabbccdd;
    uint72 uintdata = 0x123456;
    bool booldata = true;
    address addrdata = 0xdC962cEAb6C926E3a9B133c46c7258c0E371b82b;

    function getData() public view returns (bytes4 output1, uint64 output2, bytes32 output3, address output4) {
        assembly {
            let slot1 := sload(bytes4data_slot)
            let slot2 := sload(addrdata_slot)

            output1 := shl(224, and(slot1, 0xffffffff))
            output2 := shr(shl(3, uintdata_offset), slot1)
            output3 := shr(shl(3, booldata_offset), slot1)
            output4 := slot2
        }
    }
}