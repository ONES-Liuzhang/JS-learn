/**
 * https://leetcode-cn.com/problems/jump-game/
 *
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  const dp = new Array(nums.length).fill(false);

  dp[0] = true;
  for (let i = 1; i < nums.length; i++) {
    let j = i - 1;
    while (j >= 0) {
      if (dp[j] === true && nums[j] >= i - j) {
        dp[i] = true;
        break;
      }
      j--;
    }
  }
  console.log(dp);
  return dp[nums.length - 1];
};

canJump([2, 3, 1, 1, 4]);
