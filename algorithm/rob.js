/**
 * @param {number[]} nums
 * @return {number}
 * dp[i] 表示如果偷了第i家，能够偷到的最大金额
 *
 * 打家劫舍
 *
 * https://leetcode-cn.com/problems/house-robber/
 */
var rob = function (nums) {
  const n = nums.length;
  if (n === 1) return nums[0];
  if (n === 2) return Math.max(nums[0], nums[1]);
  if (n === 3) return Math.max(nums[0] + nums[2], nums[1]);

  const dp = new Array(n);

  dp[0] = nums[0];
  dp[1] = nums[1];
  dp[2] = Math.max(nums[0] + nums[2], nums[1]);

  let max = Math.max(Math.max(dp[0], dp[1]), dp[2]);

  for (let i = 3; i < n; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 3] + nums[i]);
    max = Math.max(max, dp[i]);
  }

  console.log(dp);

  return max;
};

rob([1, 2, 3, 1]);
