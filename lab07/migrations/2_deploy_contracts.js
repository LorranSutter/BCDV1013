const Springboard = artifacts.require("Springboard");
const Wallet = artifacts.require("Wallet");
const WalletV2 = artifacts.require("WalletV2");

module.exports = function(deployer) {
  deployer.deploy(Springboard);
};
