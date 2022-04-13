/**
 * 矩阵中的路径
 *
 * https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof/
 */
function exist(board, word) {
  if (!board || board.length === 0) return false;

  const rows = board.length;
  const cols = board[0].length;

  if (rows * cols < word.length) return false;

  for (let n = 0; n < rows; n++) {
    for (let m = 0; m < cols; m++) {
      if (hasPath(n, m, 0) === true) {
        return true;
      }
    }
  }

  return false;

  function hasPath(row, col, pathIndex) {
    // 边界条件
    if (
      row < 0 ||
      col < 0 ||
      row === rows ||
      col === cols ||
      pathIndex === word.length ||
      board[row][col] === false
    )
      return false;

    // 不满足相等条件返回false
    if (board[row][col] !== word.charAt(pathIndex)) return false;

    // 遍历到最后一个字符并且相等，返回true
    if (pathIndex === word.length - 1) return true;

    const currChar = board[row][col];
    board[row][col] = false;
    const exist =
      hasPath(row + 1, col, pathIndex + 1) ||
      hasPath(row, col + 1, pathIndex + 1) ||
      hasPath(row - 1, col, pathIndex + 1) ||
      hasPath(row, col - 1, pathIndex + 1);

    board[row][col] = currChar;

    return exist;
  }
}
