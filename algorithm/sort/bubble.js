// 冒泡排序 会改变原数组
// 时间复杂度 O(n2) 空间复杂度 O(1)
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

/** 改进版 - 使用flag记录，如果第一次没有进行过交换，表示数组有序，不需要再进行下一步
 *  最优时间复杂度O(n) 平均时间复杂度O(n2)
 */
function betterBubbleSort(arr) {
  let flag = true;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        if (flag) flag = false;
      }
    }
    if (flag) break;
  }
}

let arr = [3, 2, 1, -1, 8, 211];

betterBubbleSort(arr);

console.log(arr);
