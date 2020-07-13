const BitWise = artifacts.require('BitWise');
const { BN } = require('@openzeppelin/test-helpers');
const chaiBN = require('chai-bn')(BN);
require('chai').use(chaiBN);
const { expect } = require('chai');

contract("BitWise", () => {
    let bitwise;
    before(() => {
        return BitWise.deployed().then(instance => {
            bitwise = instance;
        })
    })

    it('countBitSet() should pass', async () => {
        const myNumber = 250;
        const gas = await bitwise.countBitSet.estimateGas(myNumber);
        const gasAsm = await bitwise.countBitSetAsm.estimateGas(myNumber);
        expect(gas).to.be.gt(gasAsm, "Assembly should be more gas efficient");

        const result = await bitwise.countBitSet(myNumber);
        const resultAsm = await bitwise.countBitSetAsm(myNumber);
        expect(result).to.be.a.bignumber.that.equal(resultAsm, "result should match");
    })

    it('countBitSetAsm(0) should pass', async () => {
        const myNumber = 0;
        const resultAsm = await bitwise.countBitSetAsm(myNumber);
        expect(new BN(8)).to.be.a.bignumber.that.equal(resultAsm, "result should match");
    })
}) 