/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  let l=0;
  let r=0;

  while(r < nums.length) {
    if(nums[r] === val) {
      r++
    } else {
      nums[l++] = nums[r++]
    }
  }

  return l
};
// @lc code=end

