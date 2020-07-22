# GSN-DAPP
Building a DAPP for sending meta transaction (gas less transaction)

## Steps

- Clone this repository

```bash
git clone https://github.com/GeorgeBrownCollege-Toronto/Advanced-Smart-Contracts.git ./gsn-counter-dapp && cd ./gsn-dapp && git filter-branch --prune-empty --subdirectory-filter ./notes/meta-transactions/demo/gsn-counter-dapp HEAD && rm -rf ./.git
```

### Spin up backend

- In seperate new terminal run `ganache-cli`
- In seperate new terminal run `npx oz-gsn run-relayer`
- In seperate new terminal run `npx openzeppelin create`

```bash
Nothing to compile, all contracts are up to date.
? Pick a contract to instantiate Counter
? Pick a network development
✓ Added contract Counter
✓ Contract Counter deployed
All contracts have been deployed
✓ Setting everything up to create contract instances
✓ Instance created at 0xC843262031a16957eca72D3cBcfad821851Df440
```
- fund the recipient `$ npx oz-gsn fund-recipient --recipient 0xC843262031a16957eca72D3cBcfad821851Df440`
- set up relayer address `npx oz send-tx --to 0xC843262031a16957eca72D3cBcfad821851Df440`<br/>
 Source : [https://forum.openzeppelin.com/t/uncaught-in-promise-error-error-the-relay-hub-address-is-set-to-zero-in-recipient/1354](https://forum.openzeppelin.com/t/uncaught-in-promise-error-error-the-relay-hub-address-is-set-to-zero-in-recipient/1354)

### Setting up client

- `cd ./client`
- `yarn`
- `cd ./client/src`
- `ln -ns ../../build` creates a symlink so we can access our compiled contract `.json` files
- `cd ..`
- `yarn start`

### Rinkeby
 - Counter.sol : `0xbd28183b4E3681946Ed1CF7A6071b57Bd2B21dfF`

#### Tutorial
[https://docs.openzeppelin.com/learn/sending-gasless-transactions](https://docs.openzeppelin.com/learn/sending-gasless-transactions)
0xd216153c06e857cd7f72665e0af1d7d82172f494
0xC1a1Ae36bFb9e1D4Ca7FF4385385f5C1E71dc672
address=0xD216153c06E857cD7f72665E0aF1d7D82172F494