#!/bin/bash

# Test case 01
node shrinker.js shrink input/testcase1.dat output/testcase1.out
node shrinker.js unshrink output/testcase1.out compare/testcase1_compare.out
echo $(sha1sum input/testcase1.dat)
echo $(sha1sum compare/testcase1_compare.out)

# Test case 01a
node shrinker.js shrink input/testcase1a.dat output/testcase1a.out
node shrinker.js unshrink output/testcase1a.out compare/testcase1a_compare.out
echo $(sha1sum input/testcase1a.dat)
echo $(sha1sum compare/testcase1a_compare.out)

# Test case 02
node shrinker.js shrink input/testcase2.dat output/testcase2.out
node shrinker.js unshrink output/testcase2.out compare/testcase2_compare.out
echo $(sha1sum input/testcase2.dat)
echo $(sha1sum compare/testcase2_compare.out)

# Test case 02a
node shrinker.js shrink input/testcase2a.dat output/testcase2a.out
node shrinker.js unshrink output/testcase2a.out compare/testcase2a_compare.out
echo $(sha1sum input/testcase2a.dat)
echo $(sha1sum compare/testcase2a_compare.out)

# Test case 03
node shrinker.js shrink input/testcase3.dat output/testcase3.out
node shrinker.js unshrink output/testcase3.out compare/testcase3_compare.out
echo $(sha1sum input/testcase3.dat)
echo $(sha1sum compare/testcase3_compare.out)

# Test case 04
node shrinker.js shrink input/testcase4.dat output/testcase4.out
node shrinker.js unshrink output/testcase4.out compare/testcase4_compare.out
echo $(sha1sum input/testcase4.dat)
echo $(sha1sum compare/testcase4_compare.out)