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

// 时间复杂度O(nlogn) 空间复杂度 O(1)
function quickSort2(array) {
  sort(0, array.length - 1);
  console.log(array);

  function sort(i, j) {
    // 终止条件
    if (i >= j) return;
    let flag = array[i];
    // 双指针
    let left = i,
      right = j;
    while (left < right) {
      // 先走右指针再走左指针
      while (array[right] >= flag && left < right) right--;
      while (array[left] <= flag && left < right) left++;
      if (left < right) exchange(left, right);
    }

    exchange(i, right);
    // 左侧排序
    sort(i, right - 1);
    // 右侧排序
    sort(right + 1, j);
  }

  // 交换i 和 j的值
  function exchange(i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

quickSort2([3, 2, 1, 5, 2, 21, 0, 4, 92, 3]);
