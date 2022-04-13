/**
 * 合并两个数组
 *
 * https://leetcode-cn.com/problems/sorted-merge-lcci/
 *
 * @param {*} A
 * @param {*} m A的元素数量
 * @param {*} B
 * @param {*} n B的元素数量
 */
function merge(A, m, B, n) {
  const len = A.length;

  if (len < m + n) return;

  let p1 = m - 1;
  let p2 = n - 1;
  let cur = m + n - 1;

  while (p1 >= 0 && p2 >= 0) {
    if (A[p1] > B[p2]) {
      A[cur] = A[p1];
      p1--;
    } else {
      A[cur] = B[p2];
      p2--;
    }
    cur--;
  }

  while (p2 >= 0) {
    A[cur] = B[p2];
    p2--;
    cur--;
  }

  return A;
}
