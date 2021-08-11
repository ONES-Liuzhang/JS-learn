// 零钱兑换
let coinChange = function (coins, amount) {
  coins.sort((a, b) => b - a);
  let ans = { result: amount + 1 };
  let len = coins.length;
  dfs(amount, 0, 0, ans);
  return ans.result === amount + 1 ? -1 : ans.result;

  function dfs(target, idx, count, ans) {
    if (target === 0) {
      ans.result = Math.min(ans.result, count);
      return;
    }
    if (idx === len) return;
    for (
      let n = Math.floor(target / coins[idx]);
      n >= 0 && count + n < ans.result;
      n--
    ) {
      if (n === 0) return;
      dfs(target - n * coins[idx], idx + 1, count + n, ans);
    }
  }
};

console.log(coinChange([1, 2, 5], 11));

console.log(coinChange([470, 18, 66, 301, 403, 112, 360], 8235));
