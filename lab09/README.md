## Lab 09: Shrinker

Create a file compression program. Download shrinker.js and modify it. Your modified version should support shrinking and unshrinking files. Test it on the files below.

Your submission should be only your modified shrinker.js file. **Do not submit .zip files** or anything else, or you will receive 0 (but you can re-submit). If your program can shrink and unshrink test case 1, you get 3 points. Test case 2 is 4 points. Anything else gives 5 points.

- testcase1.dat: 48 "00" bytes, followed by 4 "42" bytes, followed by 83 "00" bytes (same as example in slides)
- testcase1a.dat: 48 "A" characters, followed by 4 "B" characters, followed by 83 "A" characters (may be easier to test than the previous)
- testcase2.dat: 10 sequential bytes (same as example in slides)
- testcase2a.dat: 26 sequential bytes: the lowercase alphabet (may be easier to test than the previous)
- testcase3.dat: Has a large run of spaces in it. This might expose a bug in your shrinker if you assume runs are always smaller than 256 bytes.
- testcase4.dat: [DIFFICULT] Some real javascript code. There are lots of repeated spaces so your run-length encoder may be able to shrink it. However, because the simple solution uses 2 bytes for every run of length 1, you probably will increase the size of this file. Consider making a special "tag" byte that says a run is coming up.