// 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的数字可以无限制重复被选取。

var combinationSum = function (candidates, target) {
  let result = [];
  let len = candidates.length;
  function dfs(t, combine, idx) {
    if (idx === len) return;
    if (t === 0) {
      result.push(combine);
      return;
    }
    dfs(t, combine, idx + 1);
    if (t - candidates[idx] >= 0) {
      dfs(t - candidates[idx], combine.concat(candidates[idx]), idx);
    }
  }
  dfs(target, [], 0);
  console.log(result);
  return result;
};

combinationSum([2, 3, 6, 7], 7);
