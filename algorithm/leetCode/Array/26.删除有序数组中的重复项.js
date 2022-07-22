/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if(!nums || nums.length === 0) return []

  let l=0,r=l+1
  while(r < nums.length) {
    if (nums[l] === nums[r]) {
      r ++
    } else {
      nums[l+1] = nums[r]
      l++
      r++
    }
  }

  nums.length = l + 1

  return nums.length
};
// @lc code=end