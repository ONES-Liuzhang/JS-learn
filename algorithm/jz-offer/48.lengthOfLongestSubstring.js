/**
 * 48. 最长不含重复字符的子字符串
 *
 * @param {*} str
 */
function lengthOfLongestSubstring(s) {
  if (!s) return 1;
  const len = s.length;
  if (len === 1) return s;

  const dp = new Array(len).fill(1);
  let queue = [s.charAt(0)];
  let max = 1;

  for (let i = 1; i < len; i++) {
    const ch = s.charAt(i);
    if (!~queue.indexOf(ch)) {
      dp[i] += dp[i - 1];
      queue.push(ch);
      max = Math.max(dp[i], max);
    } else {
      queue = [ch];
    }
  }

  return max;
}

lengthOfLongestSubstring("abcabcbb");
