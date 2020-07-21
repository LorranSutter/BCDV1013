# Long lived channels


## Getting started

The [SimplePaymentChannel](https://github.com/GeorgeBrownCollege-Toronto/Advanced-Smart-Contracts/blob/master/notes/intro-state-channel/demo/simple-payment-channel/contracts/SimplePaymentChannel.sol) works well for payments made over a short period of time, but it has three limitations in the context of long-lived channels:

1. The sender must escrow all ether up front.
2. The recipient can make only a single withdrawal.
3. The timing of the channel closure is fixed when the channel is created.

This three shortcomings are addressed here:

1. Allow the sender to escrow a minimal amount of ether up front and add more funds as needed.
2. Allow the recipient to withdraw ether as needed before closing the channel.
3. Allow the sender to initiate channel closure so they can recover unspent funds in a reasonable timeframe.

Clone this repository

```bash
git clone https://github.com/GeorgeBrownCollege-Toronto/Advanced-Smart-Contracts.git ./long-lived-payment-channel && cd ./long-lived-payment-channel && git filter-branch --prune-empty --subdirectory-filter ./notes/intro-state-channel/lab/long-lived-payment-channel HEAD && rm -rf ./.git
```

Following the steps to complete this exercise:
1. clone this project
2. update packages: ```npm ci```
3. run the test: ```npm test```
4. make sure 1 test case passes, the one that deploys the contract
5. write down a test case for `withdraw` and `close` by modifying `test/longlivepaymentchannel.test.js`
6. commit your changes to github and submit your github url

#### Are you feeling adventurous?
7. Add test cases for `claimTimeOut`, `startSenderClose` and `deposit` function . (not consider for evaluation) 