// 0-1背包问题
// 有一个重量为W的背包，有i个物品，重量为wt[i]，价值为val[i]
// 计算能装进物品的最大价值是多少
function knapsack(W, N, wt = [], val = []) {
  let dp = Array.from(new Array(N + 1), () => new Array(W + 1).fill(0));

  for (let i = 1; i < N + 1; i++) {
    for (let w = 1; w < W + 1; w++) {
      if (w - wt[i - 1] < 0) {
        dp[i][w] = dp[i - 1][w];
      } else {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - wt[i - 1]] + val[i - 1]
        );
      }
    }
  }
  return dp[N][W];
}

console.log(knapsack(100, 5, [20, 30, 40, 50, 60], [20, 30, 44, 55, 60]));
