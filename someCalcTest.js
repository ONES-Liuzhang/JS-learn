/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  let dp = [];
  for (let i = 0; i < m + 1; i++) dp[i] = new Array();

  //   for(let i=0; i<m+1; i++) {
  //       for(let j=0; j< n+1; i++) {
  //           dp[i][j] =''
  //       }
  //   }
  for (let i = 1; i < m + 1; i++) dp[i][1] = 1;
  for (let i = 1; i < n + 1; i++) dp[1][i] = 1;

  for (let j = 2; j < n + 1; j++) {
    for (let i = 2; i < m + 1; i++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  console.log(dp);
  return dp[m][n];
};

uniquePaths(7, 3);
