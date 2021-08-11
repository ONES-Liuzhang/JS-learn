/**
 * 输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。
 * @param {*} arr
 * @param {*} k
 * @returns
 */
var getLeastNumbers = function (arr, k) {
  if (k > arr.length) return arr;

  const heap = [];

  for (let i = 0; i < arr.length; i++) {
    if (heap.length < k) {
      addHeap(arr[i]);
    } else if (arr[i] < heap[0]) {
      // 删除头部
      deleteHeap();
      // 插入arr[i]
      addHeap(arr[i]);
    }
  }

  return heap;
  /** 插入 */
  function addHeap(val) {
    heap.push(val);

    let i = heap.length - 1,
      j = Math.floor((i - 1) / 2);

    while (j >= 0) {
      if (heap[i] > heap[j]) {
        let temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
      } else {
        return;
      }
      i = j;
      j = Math.floor((i - 1) / 2);
    }
  }

  /** 删除堆顶 */
  function deleteHeap() {
    heap[0] = heap.pop();
    let i = 0,
      j = 2 * i + 1;
    while (j < heap.length) {
      if (j + 1 < heap.length && heap[j] < heap[j + 1]) {
        j = j + 1;
      }

      if (heap[i] < heap[j]) {
        let temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
      } else {
        return;
      }
      i = j;
      j = 2 * i + 1;
    }
  }
};

console.log(getLeastNumbers([0, 0, 1, 2, 4, 2, 2, 3, 1, 4], 8));
