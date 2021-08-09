/**
 * 选择排序
 * 关键字： 找到范围内的“最小值”
 * 最优时间复杂度 和 平均时间复杂度都是 O(n2)
 */
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr.length - 1; j > i; j--) {
      if (arr[j] < arr[i]) {
        [arr[j], arr[i]] = [arr[i], arr[j]];
      }
    }
  }
}

/** 标准选择排序，优化
 * 减少数组的操作频率
 */
function betterSelectSort(arr) {
  let minIndex;
  for (let i = 0; i < arr.length; i++) {
    minIndex = i;
    for (let j = arr.length - 1; j > i; j--) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
  }
}

const arr = [8, 7, 1, -2, 20, 2, 2, 2, 2];
betterSelectSort(arr);
console.log(arr);
