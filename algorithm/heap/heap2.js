// 1. 堆的插入 - 构造一个大顶堆
function createMaxHeap(arr) {
  const heap = [];
  let temp;

  for (let i = 0; i < arr.length; i++) {
    add(arr[i]);
  }

  return heap;

  function add(val) {
    heap.push(val);
    let curr = heap.length - 1;
    while (curr > 0) {
      let parent = Math.floor((curr - 1) / 2);
      if (heap[curr] > heap[parent]) {
        temp = heap[curr];
        heap[curr] = heap[parent];
        heap[parent] = temp;
      }
      curr = parent;
    }
  }
}

// 小顶堆 add 和 upHeap 两种方式都可以
function createMinHeap(arr) {
  const heap = [];
  let temp;

  for (let i = 0; i < arr.length; i++) {
    heap.push(arr[i]);
    upHeap(0, heap.length - 1);
  }

  return heap;

  function upHeap(low, high) {
    let i = high;
    let j = Math.floor((i - 1) / 2);
    while (j >= low) {
      if (heap[i] < heap[j]) {
        temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;

        i = j;
        j = Math.floor((i - 1) / 2);
      } else {
        break;
      }
    }
  }
}

console.log(createMaxHeap([2, 2, 1, 4, 8]));

console.log(createMinHeap([2, 2, 1, 4, 8]));

// 2. 大堆 - 堆顶删除
function heapPop(heap) {
  heap[0] = heap.pop();
  let temp;
  const len = heap.length;
  let i = 0;
  let j = 2 * i + 1;

  while (j < len) {
    if (j + 1 < len && heap[j] < heap[j + 1]) {
      j = j + 1;
    }

    if (heap[i] < heap[j]) {
      temp = heap[i];
      heap[i] = heap[j];
      heap[j] = temp;
      i = j;
      j = 2 * i + 1;
    } else {
      break;
    }
  }

  return heap;
}

const h = createMaxHeap([2, 2, 1, 4, 8]);
console.log(heapPop(h));
console.log(heapPop(h));
console.log(heapPop(h));
