var spiralOrder = function (matrix) {
  const result = [];
  printStartWith(0, 0, matrix.length - 1, matrix[0].length - 1);
  return result;
  function printStartWith(start_i, start_j, end_i, end_j) {
    // 终止条件
    if (start_i > end_i || start_j > end_j) return;

    for (let k = start_j; k <= end_j; k++) {
      result.push(matrix[start_i][k]);
    }
    for (let k = start_i + 1; k <= end_i; k++) {
      result.push(matrix[k][end_j]);
    }
    if (start_i !== end_i) {
      for (let k = end_j - 1; k >= start_j; k--) {
        result.push(matrix[end_i][k]);
      }
    }
    if (start_j !== end_j) {
      for (let k = end_i - 1; k > start_i; k--) {
        result.push(matrix[k][start_j]);
      }
    }

    printStartWith(start_i + 1, start_j + 1, end_i - 1, end_j - 1);
  }
};

console.log(spiralOrder([[]]));
