const { connection } = require('./connection');
const { web3, abi } = connection;
const { address } = require('./contractAddress.json');

web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const simpleContract = new web3.eth.Contract(
    abi,
    address
);

simpleContract.methods
    .getNumber()
    .call()
    .then((result) => {
        console.log("Current number is ", result);
    });

simpleContract.methods
    .setNumber(7)
    .estimateGas()
    .then((gas) => {
        simpleContract.methods
            .setNumber(7)
            .send({ from: web3.eth.accounts.wallet[0].address, gas })
            .then(() => {
                console.log("New number set");
            });
    });

simpleContract.methods
    .getNumber()
    .call()
    .then((result) => {
        console.log("Current number is ", result);
    });

simpleContract.methods
    .setNewRandomNumber(7)
    .estimateGas()
    .then((gas) => {
        simpleContract.methods
            .setNewRandomNumber(7)
            .send({ from: web3.eth.accounts.wallet[0].address, gas })
            .then(() => {
                console.log("New number set");
            });
    });