// 时间复杂度
// 空间复杂度
var combinationSum4 = function (nums, target) {
  // 排序
  nums.sort((a, b) => a - b);
  let len = nums.length;

  // 记忆化搜索
  let memo = new Array(target + 1);
  memo[0] = 1;
  function dfs(t) {
    if (typeof memo[t] !== "undefined") return memo[t];
    let ans = 0;
    for (let i = 0; i < len; i++) {
      if (t - nums[i] < 0) break;
      ans += dfs(t - nums[i]);
    }
    memo[t] = ans;
    return memo[t];
  }
  return dfs(target);
};
// const combinationSum4 = (nums, target) => {
//   const memo = new Array(target + 1);
//   memo[0] = 1;
//   nums.sort((a, b) => a - b);
//   const dfs = (target) => {
//     if (memo[target] === undefined) {
//       let sum = 0;
//       for (let num of nums) {
//         if (target < num) break;
//         sum += dfs(target - num);
//       }
//       memo[target] = sum;
//     }
//     return memo[target];
//   };
//   console.log(memo);
//   return dfs(target);
// };

console.log(combinationSum4([3, 33, 333], 10000));
