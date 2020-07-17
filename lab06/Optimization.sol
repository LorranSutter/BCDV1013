pragma solidity ^0.6.0;

struct Account {
    uint256 balance;
    uint64 counter;
    uint64 timestamp;
}

contract MyContract {
    mapping(address => Account) accounts;
    address owner = msg.sender;
    uint256 numCredits;
    bool contractLocked;
    
    modifier notLocked() {
        require(!contractLocked || msg.sender == owner, "contract locked");
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }
    
    function setLocked(bool newLocked) public onlyOwner {
        contractLocked = newLocked;
    }
    
    function creditBalance(uint256 amount, address who) public onlyOwner {
        numCredits++;
        accounts[who].balance += amount;
    }
    
    function transferBalance(uint256 amount, address who) public notLocked {
        accounts[msg.sender].balance = safeSub(accounts[msg.sender].balance, amount);
        accounts[who].balance = safeAdd(accounts[who].balance, amount);
        
        accounts[msg.sender].counter++;
        accounts[msg.sender].timestamp = uint64(now);
    }
    
    function safeSub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        return a - b;
    }
 
    function safeAdd(uint256 a, uint256 b) internal pure returns (uint256) {
        require(a + b >= a);
        return a + b;
    }
}