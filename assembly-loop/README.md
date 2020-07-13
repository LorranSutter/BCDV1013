# assembly-loop

Following the steps to complete this exercise:
1. clone this project
```bash
git clone https://github.com/GeorgeBrownCollege-Toronto/Advanced-Smart-Contracts.git ./assembly-loop && cd ./assembly-loop && git filter-branch --prune-empty --subdirectory-filter ./notes/solidity-assembly/lab/assembly-loop HEAD && rm -rf ./.git
```
^^^ Stack Overflow : [https://stackoverflow.com/a/11835214](https://stackoverflow.com/a/11835214)
1. install packages: npm install
1. run the test: npm test
1. the test should fail the gas test
1. fix the failed test case by updating the BitWise.sol contract
   - replace the logic in the countBitSetAsm() with inline assembly logic
1. add a test case to verify the result for countBitSetAsm(0)
1. commit your changes to github and submit your github url
