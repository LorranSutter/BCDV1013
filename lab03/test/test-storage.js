const Storage = artifacts.require('Storage')
const BN = require('bn.js')

contract("Storage", () => {
    it("getData should pass", async () => {
        const instance = await Storage.deployed();
        const result = await instance.getData();
        assert.equal(Object.keys(result).length, 8, "result should have 4 elements")
        assert.equal(result[0], '0xaabbccdd', "bytes4 should be 0xaabbccdd");
        assert.ok(result[1].eq(new BN(0x123456)), "uint64 should be 0x123456")
        assert.equal(result[2], true, "bool should be true")
        assert.equal(result[3], '0xdC962cEAb6C926E3a9B133c46c7258c0E371b82b', 'address mismatch')
    })
})