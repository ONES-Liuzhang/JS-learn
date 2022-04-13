/**
 * 最大环形子数组和
 *
 * 先求最大子数组和 dpMin
 * 再求最小子数组和 dpMax
 *
 * 注意边界情况，当 sum - minSum === 0 时，maxSum 就无效了
 *
 * medium
 */
function maxSubarrySumCircle(nums) {
  if (!nums) return 0;

  const sum = nums.reduce((cur, next) => cur + next, 0);

  let dpMin = nums[0];
  let dpMax = nums[0];

  let minSum = dpMin;
  let maxSum = dpMax;

  for (let i = 1; i < nums.length; i++) {
    dpMin = nums[i] + Math.min(dpMin, 0);
    dpMax = nums[i] + Math.max(dpMax, 0);

    minSum = Math.min(minSum, dpMin);
    maxSum = Math.max(maxSum, dpMax);
  }

  return sum - minSum === 0 ? maxSum : Math.max(maxSum, sum - minSum);
}

const maxSum = maxSubarrySumCircle([-2, -3, -2]);

console.log(maxSum);
