// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.4.0;

contract Test {
    function f(int a, int b) public pure returns (int output) {
        assembly {
            a b
            dup2  // a b a
            add   // a (a+b)
            dup1  // a (a+b) (a+b)
            dup1  // a (a+b) (a+b) (a+b)
            mul   // a (a+b) (a+b)**2
            mul   // a (a+b)**3
            swap1 // (a+b)**3 a
            2     // (a+b)**3 a 2
            swap1 // (a+b)**3 2 a
            sub   // (a+b)**3 (a-2)
            mul   // (a-2)*(a+b)**3
            =: output
        }
    }
}