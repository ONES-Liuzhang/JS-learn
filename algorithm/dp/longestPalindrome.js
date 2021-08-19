/**
 *  最长回文字符串子串
 * @param {*} s
 * @returns
 *
 * *** 二维数组必须循环创建，不能使用fill，否则会有引用相等的问题
 */
var longestPalindrome = function (s) {
  if (s.length <= 1) return s;
  // 初始化dp 为二维数组
  let dp = new Array(s.length);

  for (let i = 0; i < s.length; i++) {
    dp[i] = new Array(s.length).fill(false);
  }

  let max = 1;
  let left = 0;
  let right = 0;
  for (let i = 0; i < s.length; i++) {
    dp[i][i] = true;
  }

  for (let j = 1; j < s.length; j++) {
    for (let i = 0; i < j; i++) {
      if (i < j - 1) {
        dp[i][j] = dp[i + 1][j - 1] && s[i] === s[j];
      } else {
        dp[i][j] = s[i] === s[j];
      }

      if (dp[i][j] && j - i + 1 > max) {
        left = i;
        right = j;
        max = j - i + 1;
      }
    }
  }
  return s.substring(left, right + 1);
};

// 中心扩散法

console.log(longestPalindrome("ab"));
