// 找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。
var combinationSum3 = function (k, n) {
  let source = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let result = [];
  let len = 9;
  function dfs(t, combine, idx) {
    // 节点深度
    let deep = combine.length;
    if (t === 0 && deep === k) {
      result.push(combine);
      return;
    }
    if (idx === 9 || deep >= k) return;

    for (let i = idx; i < len; i++) {
      dfs(t - source[i], combine.concat(source[i]), i + 1);
    }
  }
  dfs(n, [], 0);
  return result;
};

combinationSum3(3, 7);
