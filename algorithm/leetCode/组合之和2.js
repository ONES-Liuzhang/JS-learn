var combinationSum2 = function (candidates, target) {
  // init
  let result = [];
  let len = candidates.length;

  dfs(target, [], 0);
  console.log(result);
  return result;

  function dfs(t, combine, idx) {
    if (t < 0) return;
    if (idx === len) return;
    if (t === 0) {
      result.push(combine);
      return;
    }

    dfs(t, combine, idx + 1);
    if (t - candidates[idx] >= 0) {
      if(idx > 0 && candidates[idx - 1] === candidates[idx])
      dfs(t - candidates[idx], combine.concat(candidates[idx]), idx + 1);
    }
  }
};

combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);
