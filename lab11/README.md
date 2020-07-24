## Lab 11: Voting

Modify the _Voting.sol_ file to properly check the provided merkle tree proof. Your submission should be only your modified _Voting.sol_ file. **Do not submit .zip files** or anything else, or you will receive 0 (but you can re-submit).

- In this lab, we will implement a smart contract that allows certain addresses to vote _yes_ or _no_ on some proposal. We don't want to copy/paste the list of addresses allowed to vote into the smart contract because it may be very large. Instead, we will encode this list as a merkle tree, and voters will need to submit a merkle proof of their eligibility in order to vote.
- Download the voter-tree.js and _addresses.txt_ files.
- Open up the remix solidity IDE, copy your account address, and add it somewhere to the _addresses.txt_ file you downloaded.
- Generate the merkle root for the _addresses.txt_ file by running the following command:
  `node voter-tree.js root addresses.txt`
- Copy this root and use it as the constructor argument to deploy the _Voting.sol_ file in remix.
- Generate a proof for your address by running the following command (replace the address with your own):
  `node voter-tree.js proof addresses.txt 0xca35b7d915458ef540ade6068dfe2f44e8fa733c`
- Use the proof as input to the vote() function in your solidity program.