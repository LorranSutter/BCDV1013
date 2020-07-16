require("dotenv").config();

const Web3 = require("web3");
const fs = require('fs');

const abiFile = fs.readFileSync('./__SimpleContract_sol_SimpleContract.abi');
const bytecodeFile = fs.readFileSync('./__SimpleContract_sol_SimpleContract.bin');

const abi = JSON.parse(abiFile.toString());
const bytecode = bytecodeFile.toString();

// Ran in ganache-cli
const web3 = new Web3(process.env.URI);
const accountObj = web3.eth.accounts.privateKeyToAccount(
    process.env.PRIVATE_KEY
);

exports.connection = { web3, accountObj, abi, bytecode }