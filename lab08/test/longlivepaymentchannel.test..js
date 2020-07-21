const LongLivedPaymentChannel = artifacts.require("LongLivedPaymentChannel");

contract(
  "Recipient should be able to withdraw amount and then close",
  (accounts) => {
    // declare all global variables here
    let contractInstance;
    let contractAddress;
    let longLivedPaymentChannelTx;
    const skey =
      "dec072ad7e4cf54d8bce9ce5b0d7e95ce8473a35f6ce65ab414faea436a2ee86"; // private key
    web3.eth.accounts.wallet.add(`0x${skey}`);
    const masterAccount = accounts[0];
    const sender = web3.eth.accounts.wallet[0].address;
    const senderSkey = web3.eth.accounts.wallet[0].privateKey;
    const recipient = accounts[1];
    const closeDuration = 200;
    const depositAmount = web3.utils.toWei("2", "ether");

    // sender can open the channel (deploy contract and deposit funds)
    before(async () => {
      await web3.eth.sendTransaction({
        from: masterAccount,
        to: sender,
        value: web3.utils.toWei("5", "ether"),
        gas: 21000,
      });

      contractInstance = new web3.eth.Contract(LongLivedPaymentChannel.abi);

      const gas = await contractInstance
        .deploy({
          data: LongLivedPaymentChannel.bytecode,
          from: sender,
          value: depositAmount,
          arguments: [recipient, closeDuration],
        })
        .estimateGas();

      longLivedPaymentChannelTx = await contractInstance
        .deploy({
          data: LongLivedPaymentChannel.bytecode,
          arguments: [recipient, closeDuration],
        })
        .send({
          from: sender,
          gas,
          value: depositAmount,
        });

      contractAddress = longLivedPaymentChannelTx.options.address;

      const actualSender = await longLivedPaymentChannelTx.methods.sender().call({
        from: recipient,
      });
      const actualRecipient = await longLivedPaymentChannelTx.methods.recipient().call({
        from: accounts[2]
      });
      const actualCloseDuration = await longLivedPaymentChannelTx.methods.closeDuration().call({
        from: accounts[2]
      })
      const actualDepositedAmount = await web3.eth.getBalance(contractAddress);

      // assertions
      assert.equal(actualSender, sender, "Sender is not as expected");
      assert.equal(
        actualDepositedAmount,
        depositAmount,
        "The deposited amount is as expected"
      );
      assert.equal(
        actualRecipient,
        recipient,
        "The recipient is as expected"
      );
      assert.equal(actualCloseDuration, closeDuration, "closeDuration is not as expected")

    });

    it("the recipient should be able to withdraw from the channel", async () => {
      const withdrawValue = web3.utils.toWei("1", "ether");
      const contractAddressInitialBalance = await web3.eth.getBalance(contractAddress);
      const recipientInitialBalance = await web3.eth.getBalance(recipient);

      const msgHash = web3.utils.soliditySha3(
        { t: "address", v: contractAddress },
        { t: "uint256", v: withdrawValue }
      );

      const signedMsg = await web3.eth.accounts.sign(msgHash, senderSkey);

      const withdrawTx = await longLivedPaymentChannelTx.methods
        .withdraw(withdrawValue, signedMsg.signature)
        .send({ from: recipient });

      const recipientNewBalance = await web3.eth.getBalance(recipient);
      const contractNewBalance = await web3.eth.getBalance(contractAddress);

      const tx = await web3.eth.getTransaction(withdrawTx.transactionHash);

      const transactionFee = web3.utils
        .toBN(tx.gasPrice)
        .mul(web3.utils.toBN(withdrawTx.gasUsed));

      const recipientCalculatedBalance = web3.utils
        .toBN(recipientInitialBalance)
        .add(web3.utils.toBN(withdrawValue))
        .sub(web3.utils.toBN(transactionFee));

      const contractCalculatedBalance = web3.utils
        .toBN(contractAddressInitialBalance)
        .sub(web3.utils.toBN(withdrawValue));

      assert.equal(recipientCalculatedBalance, recipientNewBalance, "Unexpected recipient balance");
      assert.equal(contractCalculatedBalance, contractNewBalance, "Unexpected contract balance");
    });
  }
);
