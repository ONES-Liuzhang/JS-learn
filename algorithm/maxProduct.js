/**
 * @param {number[]} nums
 * @return {number}
 * 乘积最大子数组
 * https://leetcode-cn.com/problems/maximum-product-subarray/
 *
 * dpMax[i] 表示以下标 i - 1 结尾的子数组的最大乘积
 * dpMin[i] 表示以下标 i - 1 结尾的子数组的最小乘积
 *
 */
var maxProduct = function (nums) {
  const n = nums.length;
  const dpMax = new Array(n + 1);
  const dpMin = new Array(n + 1);

  dpMax[0] = 1;
  dpMin[0] = 1;

  let max = Number.MIN_SAFE_INTEGER;

  for (let i = 1; i < n + 1; i++) {
    const preMin = dpMin[i - 1];
    const preMax = dpMax[i - 1];

    if (nums[i - 1] < 0) {
      dpMin[i] = Math.min(nums[i - 1], preMax * nums[i - 1]);
      dpMax[i] = Math.max(nums[i - 1], preMin * nums[i - 1]);
    } else {
      dpMin[i] = Math.min(nums[i - 1], preMin * nums[i - 1]);
      dpMax[i] = Math.max(nums[i - 1], preMax * nums[i - 1]);
    }

    max = Math.max(max, dpMax[i]);
  }

  return max;
};

maxProduct([-2, 0, -1]);
