/**
 * 插入排序
 * 下标为 i 的项 在 有序队列[0, i-1] 中找到自己应该在的位置并插入
 * 最好时间复杂度：当数组有序时为 O(n)
 * 最坏时间复杂度：当数组倒序时为 O(n2)
 * 平均时间复杂度: O(n2)
 */
function insertSort(arr) {
  let curr;
  for (let i = 0; i < arr.length; i++) {
    curr = arr[i];
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > curr) {
        arr[j + 1] = arr[j];
      } else {
        // 找到位置 跳出循环
        arr[j + 1] = curr;
        break;
      }
    }
  }
}

const arr = [2, 2, 1, 1, -1, 8, 3, 5, 2];

insertSort(arr);
console.log(arr);
