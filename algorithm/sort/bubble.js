// 冒泡排序 会改变原数组
// 时间复杂度 O(n2) 空间复杂度 O(1)
function bubbleSort(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[i]) {
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
    }
  }
}

let arr = [3, 2, 1];

bubbleSort(arr);

console.log(arr);
