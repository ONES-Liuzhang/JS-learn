// 堆： 特殊的完全二叉树
// 大顶堆
// 小顶堆
// 特点：
// 1. (2n - 1)/2 表示 n 的父节点索引
// 2. 2n + 1 索引为n的节点的左子节点索引
// 3. 2n + 2 索引为n的节点的右子节点索引

// 大顶堆
// 1. 删除堆顶
// const heap = [9, 8, 6, 3, 1]
const heap = [1, 8, 6, 3]; // 堆尾元素替换堆顶元素
downHeap(0, heap.length - 1);
console.log(heap);
/**
 * 第一步：堆尾元素替换堆顶元素
 * 第二步：向下对比替换
 * low high 表示堆在数组里的索引范围
 * @param {*} low 下界
 * @param {*} high 上界
 */
function downHeap(low, high) {
  let i = low,
    j = 2 * i + 1;

  while (j <= high) {
    // 右节点大与左节点，更新j的索引
    if (j + 1 <= high && heap[j + 1] > heap[j]) {
      j = j + 1;
    }

    // 替换
    if (heap[i] < heap[j]) {
      let temp = heap[i];
      heap[i] = heap[j];
      heap[j] = temp;
    } else {
      // 满足大顶堆堆结构条件 直接return
      return;
    }
    i = j;
    j = 2 * i + 1;
  }
}

// 2. 堆的插入
heap.push(10);
upHeap(0, heap.length - 1);
console.log(heap);
/**
 * 第一步：插入尾部
 * 第二步：向上对比替换
 * @param {*} low 下界
 * @param {*} high 上界
 */
function upHeap(low, high) {
  let i = high,
    j = Math.floor((i - 1) / 2);

  while (j >= low) {
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
