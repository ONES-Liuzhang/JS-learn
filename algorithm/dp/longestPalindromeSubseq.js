/**
 * 给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。
 * 子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。
 * @param {*} s
 * @returns
 */
var longestPalindromeSubseq = function (s) {
  const dp = new Array(s.length);
  for (let i = 0; i < s.length; i++) {
    dp[i] = new Array(s.length).fill(0);
    dp[i][i] = 1;
  }

  let curr = 1;

  while (curr < s.length) {
    let i = 0;
    let j = curr;
    while (j < s.length) {
      if (i + 1 === j) {
        dp[i][j] = s[i] === s[j] ? 2 : 1;
      } else if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
      i++;
      j++;
    }
    curr++;
  }

  console.log(dp);

  return dp[0][s.length - 1];
};

console.log(longestPalindromeSubseq("aabaaba"));
