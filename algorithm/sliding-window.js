// 滑动窗口问题
// leetcode 76. 最小覆盖子串
// 给你一个字符串 S、一个字符串 T 。请你设计一种算法，可以在 O(n) 的时间复杂度内，从字符串 S 里面找出：包含 T 所有字符的最小子串。
var minWindow = function (s, t) {
  let winFreq = {},
    tFreq = {};
  let minLen = s.length + 1;
  let distance = 0; // 表示window中包含的t中字母的个数
  let result = Array(s.length + 1).fill(null);
  // 初始化
  for (let i = 0; i < t.length; i++) {
    tFreq[t.charAt(i)] || (tFreq[t.charAt(i)] = 0);
    tFreq[t.charAt(i)]++;
  }
  // 左闭右开区间 [left, right)
  let left = 0,
    right = 0;
  // 先滑动右窗口
  while (right < s.length) {
    winFreq[s.charAt(right)] || (winFreq[s.charAt(right)] = 0);

    if (winFreq[s.charAt(right)] < tFreq[s.charAt(right)]) {
      distance++;
    }
    winFreq[s.charAt(right)]++;
    right++;

    // 当前子串已经包含t
    // 滑动左窗口
    while (distance === t.length && left < right) {
      if (winFreq[s.charAt(left)] === tFreq[s.charAt(left)]) {
        // 记录当前子串
        minLen = Math.min(right - left, minLen);
        result[minLen] || (result[minLen] = s.substr(left, minLen));

        distance--;
        winFreq[s.charAt(left)]--;
        left++;
        break;
      }
      winFreq[s.charAt(left)]--;
      left++;
    }
  }
  return result[minLen] || "";
};

console.log(minWindow("ADOBECODEBANC", "ABC"));
