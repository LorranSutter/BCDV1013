// Inject environemnt variable in this file
require("dotenv").config("./env");

const fs = require('fs');
const Web3 = require("web3");

const { address } = require('./contractAddress.json');
const abiFile = fs.readFileSync('./__SimpleContract_sol_SimpleContract.abi');
const abi = JSON.parse(abiFile.toString());

const web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.URI)
);

web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const simpleContract = new web3.eth.Contract(
    abi,
    address
);

simpleContract.events
    .NewNumber((error, event) => {
        console.log(event);
    })
    .on("error", console.error);


// Output event
// {
//     logIndex: 0,
//     transactionIndex: 0,
//     transactionHash: '0x4aa8896d3abe454fa6c32a3a545d0fc63aed2997e7870ab3daead298353c505a',
//     blockHash: '0x011bdbddf99108c2323dc0a672589da78f293c173111bbfa04b69741c8389033',
//     blockNumber: 67,
//     address: '0x5b1869D9A4C187F2EAa108f3062412ecf0526b24',
//     type: 'mined',
//     id: 'log_25107e0f',
//     returnValues: Result { '0': '7', newNumber: '7' },
//     event: 'NewNumber',
//     signature: '0xd932f6a2eb240089fd3c3d5be9ad1a5ae5d828aefbddf87f93279481929d39d6',
//     raw: {
//         data: '0x0000000000000000000000000000000000000000000000000000000000000007',
//         topics: [
//         '0xd932f6a2eb240089fd3c3d5be9ad1a5ae5d828aefbddf87f93279481929d39d6'
//         ]
//     }
// }