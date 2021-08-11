/**
 * 最长上升子序列
 */
// 1. 普通的动态规划思路
// 长度为 n 的数组的最长上升子序列的长度 = Max(长度为[1, n-1]的数组的最长上升子序列长度) + 1
var normalLengthOfLIS = function (nums) {
  const dp = new Array(nums.length).fill(1);
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 1; i < nums.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] > nums[i]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
    max = Math.max(max, dp[i]);
  }
  return max;
};

// 2. 优化dp数组的定义，时间复杂度O(n2)
var lengthOfLIS = function (nums) {
  // 下标i表示长度为i+1的子序列的最小尾部值
  const tail = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    for (let j = tail.length - 1; j >= 0; j--) {
      if (tail[j] < nums[i]) {
        if (j === tail.length - 1) tail.push(nums[i]);
        else tail[j + 1] = nums[i];
        break;
      } else if (j === 0) tail[j] = nums[i];
    }
  }
  return tail.length;
};

// 2. 优化 - tail数组是递增，使用二分法
var betterLengthOfLIS = function (nums) {
  // 下标i表示长度为i+1的子序列的最小尾部值
  const tail = new Array(nums.length).fill(Number.MIN_SAFE_INTEGER);
  // res表示当前最长子序列的长度
  let res = 0;

  for (let i = 0; i < nums.length; i++) {
    let l = 0;
    let r = res;
    while (l < r) {
      const mid = Math.floor((l + r) / 2);
      if (tail[mid] < nums[i]) l = mid + 1;
      else r = mid;
    }
    tail[l] = nums[i];
    if (l === res) res++;
  }
  return res;
};

console.log(normalLengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
