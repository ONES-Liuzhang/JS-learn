/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  let absMin = Number.MAX_SAFE_INTEGER
  let min
  // 先排序
  nums.sort((a, b) => a - b)
  const len = nums.length
  for (let i=0; i < nums.length; i++) {
    let l=i+1, r=len-1

    while(l < r) {
      const sum = nums[l]+nums[r]+nums[i]

      if(sum === target) {
        return sum
      } else if (sum < target) {
        l ++
      } else {
        r --
      }

      if (Math.abs(sum - target) < absMin) {
        absMin = Math.abs(sum - target)
        min = sum
      }
    }
  }

  return min
};
// @lc code=end