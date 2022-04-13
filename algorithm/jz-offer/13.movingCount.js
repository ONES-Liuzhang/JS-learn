/**
 * 机器人的运动范围
 *
 * https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/
 */
function movingCount() {
  // 初始化
  const visited = new Array(n).fill(1);
  for (let i = 0; i < n; i++) {
    visited[i] = new Array(m).fill(1);
  }

  return bfs(0);
  // 广度优先
  function bfs(count) {
    const queue = [[0, 0]];

    // 边界条件
    while (queue.length > 0) {
      const pos = queue.shift();
      const i = pos[0],
        j = pos[1];
      if (i < n && j < m && visited[i][j] === 1 && validate(i, j, k)) {
        count++;
        visited[i][j] = 0;
        queue.push([i + 1, j], [i, j + 1]);
      }
    }
    return count;
  }

  function validate(i, j, k) {
    return calcUtil(i) + calcUtil(j) <= k;
  }

  function calcUtil(num) {
    return (num % 10) + Math.floor(num / 10);
  }
}
