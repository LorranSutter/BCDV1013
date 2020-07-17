const ProxyCall = artifacts.require('ProxyCall');
const ProxyDelegate = artifacts.require('ProxyDelegate');
const SomeLibrary = artifacts.require('SomeLibrary');

module.exports = function (deployer) {
    deployer.deploy(SomeLibrary)
        .then(() => deployer.deploy(ProxyDelegate, SomeLibrary.address))
        .then(() => deployer.deploy(ProxyCall, SomeLibrary.address));
}