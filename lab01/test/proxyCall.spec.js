const SomeLibrary = artifacts.require("SomeLibrary");
const ProxyCall = artifacts.require("ProxyCall");
const truffleAssert = require("truffle-assertions");
const ethers = require("ethers");
const utils = ethers.utils;

contract("ProxyCall", (accounts) => {
    let proxy;
    let lib;
    const coder = new ethers.utils.AbiCoder();
    const owner = accounts[0];
    before(async () => {
        lib = await SomeLibrary.deployed();
        proxy = await ProxyCall.deployed(lib.address, { from: owner });
    });

    it("get owner should pass", () => {
        return proxy.owner().then((result) => {
            assert.equal(result, owner, "owner not match");
        });
    });

    it("getMsgSender by call should pass", () => {
        const data = utils.id("getMsgSender()").slice(0, 10);
        return proxy.sendTransaction({ from: accounts[1], data }).then((tx) => {
            truffleAssert.eventEmitted(tx, "LogResult", (ev) => {
                const regex = new RegExp(proxy.address.slice(2), "i");
                return regex.test(ev.result);
            });
        });
    });

    it("setVersion by call should pass", async () => {
        const expectedVersion = 10;
        const selector = utils.id("setVersion(uint256)").slice(0, 10);
        const versionData = coder.encode(["uint256"], [expectedVersion]);
        const data = utils.hexlify(utils.concat([selector, versionData]));
        await proxy.sendTransaction({ from: accounts[1], data });
        const ownerResult = await proxy.owner();
        assert.equal(ownerResult, owner, "owner changed!!");
        const version = await lib.version();
        assert.equal(version, expectedVersion, "version mismatch");
    });
});