/**
 * 计数排序
 *
 * 桶排序的一种特例
 * 桶排序：把数据分为 k 个桶，对桶里的数据排序，排完之后拼在一起即可
 *
 * 时间复杂度 O(n+k) k是划分的桶的个数，当 n >> k 时，时间复杂度为 O(n)
 */
function countingSort(arr) {
  if (!arr) return;

  let max = arr[0];
  const arrLen = arr.length;
  for (let i = 1; i < arrLen; i++) {
    if (max < arr[i]) {
      max = arr[i];
    }
  }

  // 划分多个桶，每个桶储存 arr[i] 出现的次数
  const countArr = new Array(max + 1).fill(0);
  for (let i = 0; i < arrLen; i++) {
    countArr[arr[i]]++;
  }

  // 进行累加，countArr[k] 表示arr中小于等于k的个数
  for (let i = 1; i < countArr.length; i++) {
    countArr[i] += countArr[i - 1];
  }

  const result = new Array(arrLen);
  let i = arrLen - 1;
  while (i >= 0) {
    const index = countArr[arr[i]] - 1;
    result[index] = arr[i];
    countArr[arr[i]]--;
    --i;
  }

  return result;
}

console.log(countingSort([3, 1, 5, 2, 1, 2, 3, 4, 8]));
