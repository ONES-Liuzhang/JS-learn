// 快速排序
function quickSort(candidates) {
  let len = candidates.length;
  // 左闭右开
  run(0, len - 1);
  console.log(candidates);
  return candidates;

  function run(i, j) {
    let flag = candidates[i];
    let k;
    let start = i,
      end = j;
    if (i >= j) return;
    while (i < j) {
      while (i < j && candidates[j] >= flag) j--;
      while (i < j && candidates[i] <= flag) i++;
      if (i < j) {
        exchange(i, j);
      }
    }
    k = j;
    exchange(k, start);
    // left
    run(start, k - 1);
    // right
    run(k + 1, end);
  }

  function exchange(m, n) {
    if (m === n) return;
    let tmp = candidates[m];
    candidates[m] = candidates[n];
    candidates[n] = tmp;
  }
}

quickSort([3, 2, 1, 5, 2, 21, 0, 4, 92, 3]);
