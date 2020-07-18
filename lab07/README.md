# Use create2 to upgrade contracts
This example shows how to use create2 to upgrade contract as described in the [wisp](https://blog.ricmoo.com/wisps-the-magical-world-of-create2-5c2177027604) article.

There are 3 contracts in the contracts folder:
1. `Springboard.sol` - This is a contract factory. It uses create2 to create new contracts. The intend of this exercise is to use this contract to create the Wallet contract and upgrade to WalletV2 by first selfdestructing Wallet and create WalletV2 at the same address as Wallet. 
2. `Wallet.sol` - Wallet version 1.0
3. `WalletV2.sol` - Wallet version 2.0

## How does Springboard work?
The Springboard contract passes a special initcode to create2 to create new contract. As a reminder, the create2 syntax is create2(msg.value, initcode, initcode_length, salt).  The initcode logic is to return the runtime byte code for the new contract.  It gets the runtime byte code by calling Springboard.getPendingRuntimeCode(). See [initcode vs runtime code](https://medium.com/authereum/bytecode-and-init-code-and-runtime-code-oh-my-7bcd89065904) for a refresher of what initcode and runtime bytecode are.

There are 2 scripts in the scripts folder used to generate the initcode:
1. `bootstrap` - contains the list of opcodes to call Springboard.getPendingRuntimeCode()
1. `assemble.js` - assemble the opcodes in bootstrap to generate the bytecode


## How to complete this exercise

1. clone this project
```bash
git clone https://github.com/GeorgeBrownCollege-Toronto/Advanced-Smart-Contracts.git ./create2-upgrade && cd ./create2-upgrade && git filter-branch --prune-empty --subdirectory-filter ./notes/state-channel-create2/lab/create2-upgrade HEAD && rm -rf ./.git
```
2. install packages: npm install
3. update the `test/test-springboard.js` file to add logic to upgrade the Wallet contract to WalletV2
4. after the upgrade, verify that the wallet version is 2.0
5. commit your changes to GitHub and submit your GitHub url
>If your repository is private, invite me to collaborate using my GitHub handle @dhruvinparikh93

## Special notes
The contracts created by the Springboard contract do not initialize the state variable in the constructor. You will need to create a regular function (not constructor) to initialize the variables instead
