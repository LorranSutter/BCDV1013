const fs = require('fs');
const BigNumber = require("bignumber.js");

const { connection } = require('./connection');
const { web3, accountObj, abi, bytecode } = connection;

const simpleContract = new web3.eth.Contract(abi);

const _seed = new BigNumber(5);
const contractData = simpleContract
    .deploy({
        data: `0x${bytecode}`,
        arguments: [_seed],
    })
    .encodeABI();

web3.eth
    .estimateGas({ from: accountObj.address, data: contractData })
    .then((gas) => {
        const rawTx = {
            from: accountObj.address,
            gas,
            data: contractData,
        };
        web3.eth.accounts
            .signTransaction(rawTx, accountObj.privateKey)
            .then(({ rawTransaction, transactionHash }) => {
                web3.eth
                    .sendSignedTransaction(rawTransaction)
                    .on("receipt", console.log);

                waitForReceipt(transactionHash, (result) => {
                    console.log("The contract is deployed at ", result.contractAddress);
                    fs.writeFileSync('contractAddress.json', JSON.stringify({ address: result.contractAddress }));
                });
            });
    });

function waitForReceipt(hash, cb) {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
        if (err) {
            console.error(err);
        }
        if (receipt) {
            // Transaction went through
            if (cb) {
                cb(receipt);
            }
        } else {
            // Try again in 1 second
            console.log("Waiting to get mined...");
            setTimeout(function () {
                waitForReceipt(hash, cb);
            }, 1000);
        }
    });
}

// Receipt
// {
//     transactionHash: '0xdbb918be9dcea5408c44aa59eea2bfed8ce5148a4cbaeca44f16de64e10cf6b6',
//     transactionIndex: 0,
//     blockHash: '0x8f1439c09253dc259487a1a28b1beda8d13aa030a7fa19142a98ac3cea26b2cb',
//     blockNumber: 2,
//     from: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
//     to: null,
//     gasUsed: 299428,
//     cumulativeGasUsed: 299428,
//     contractAddress: '0x5b1869D9A4C187F2EAa108f3062412ecf0526b24',
//     logs: [],
//     status: true,
//     logsBloom: '0x000000000000000000000000000000000000000000000000000000000000000000000000
//                 00000000000000000000000000000000000000000000000000000000000000000000000000
//                 00000000000000000000000000000000000000000000000000000000000000000000000000
//                 00000000000000000000000000000000000000000000000000000000000000000000000000
//                 00000000000000000000000000000000000000000000000000000000000000000000000000
//                 00000000000000000000000000000000000000000000000000000000000000000000000000
//                 0000000000000000000000000000000000000000000000000000000000000000000000'
// }