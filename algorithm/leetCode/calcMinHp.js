//leetcode 174.地下城游戏
/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function (dungeon) {
  let n = dungeon.length;
  let m = dungeon[0].length;
  // 初始化dp
  let dp = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    dp[i] = Array(m).fill(0);
  }

  // 初始化边界
  dp[n - 1][m - 1] = dungeon[n - 1][m - 1] < 0 ? 1 - dungeon[n - 1][m - 1] : 1;
  for (let j = m - 1; j > 0; j--) {
    dp[n - 1][j - 1] =
      dp[n - 1][j] - dungeon[n - 1][j - 1] <= 0
        ? 1
        : dp[n - 1][j] - dungeon[n - 1][j - 1];
  }
  for (let i = n - 1; i > 0; i--) {
    dp[i - 1][m - 1] =
      dp[i][m - 1] - dungeon[i - 1][m - 1] <= 0
        ? 1
        : dp[i][m - 1] - dungeon[i - 1][m - 1];
  }
  for (let i = n - 2; i >= 0; i--) {
    for (let j = m - 2; j >= 0; j--) {
      let right =
        dp[i][j + 1] - dungeon[i][j] <= 0 ? 1 : dp[i][j + 1] - dungeon[i][j];
      let down =
        dp[i + 1][j] - dungeon[i][j] <= 0 ? 1 : dp[i + 1][j] - dungeon[i][j];
      dp[i][j] = Math.min(right, down);
    }
  }

  return dp[0][0];
};

console.log(
  calculateMinimumHP([
    [-2, -3, 3],
    [-5, -10, 1],
    [10, 30, -5],
  ])
);
