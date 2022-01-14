import { Rect, Drawer } from "./core.js";

// 获得画布
const canvas = document.getElementById("canvas");

// 获得画笔
const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.translate(500, 500);

const drawer = new Drawer(ctx);

function drawAll(arr) {
  return new Promise(function drawPromise(resolve) {
    requestAnimationFrame(() => {
      ctx.clearRect(-500, -500, 1000, 1000);
      // 根据数组获得坐标
      arr.forEach((val, index) => {
        // 获得角度
        const θ = (index / 180) * Math.PI;

        const x = Math.floor(val * Math.cos(θ));
        const y = -Math.floor(val * Math.sin(θ));

        const rect = new Rect(x, y);
        drawer.draw(rect);
      });
      resolve();
    });
  });
}

// 冒泡排序 会改变arr
export async function bubbleSort(arr) {
  // 开始排序
  for (let i = 0; i < arr.length; i++) {
    await drawAll(arr);
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
  }
}

// 选择排序
export async function selectSort(arr) {
  if (arr.length < 2) return;

  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    // 交换最小值到头部
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    await drawAll(arr);
  }
}

// 插入排序 会改变原数组
export async function insertSort(arr) {
  if (arr.length < 2) return;

  for (let i = 0; i < arr.length - 1; i++) {
    await drawAll(arr);

    // 有序数组的最后一个值
    let j = i;
    // 当前要插入的数字
    let curr = arr[i + 1];

    if (arr[j] < curr) continue;

    while (j >= 0 && arr[j] > curr) {
      // 往后挪一个
      arr[j + 1] = arr[j];

      j--;
    }

    arr[j + 1] = curr;
  }
}

// export async function insertSort(arr) {
//   // 缓存数组长度
//   const len = arr.length;
//   // temp 用来保存当前需要插入的元素
//   let temp;
//   // i用于标识每次被插入的元素的索引
//   for (let i = 1; i < len; i++) {
//     await drawAll(arr);
//     // j用于帮助 temp 寻找自己应该有的定位
//     let j = i;
//     temp = arr[i];
//     // 判断 j 前面一个元素是否比 temp 大
//     while (j > 0 && arr[j - 1] > temp) {
//       // 如果是，则将 j 前面的一个元素后移一位，为 temp 让出位置
//       arr[j] = arr[j - 1];
//       j--;
//     }
//     // 循环让位，最后得到的 j 就是 temp 的正确索引
//     arr[j] = temp;
//   }
//   return arr;
// }

// 快排 改变原数组
export async function quickSort(arr) {
  // 前闭后闭区间
  async function sortIn(start, end) {
    await drawAll(arr);
    if (start >= end) {
      return;
    }

    // 选一个幸运儿
    const base = arr[start];
    let left = start;
    let right = end;

    while (left < right) {
      // 划重点
      // 1. 要从right开始缩小区间
      while (left < right && arr[right] > base) right--;
      // 2. left的判定要加上等号
      while (left < right && arr[left] <= base) left++;

      if (left < right) {
        const tmp = arr[left];
        arr[left] = arr[right];
        arr[right] = tmp;
      }
    }

    [arr[start], arr[left]] = [arr[left], arr[start]];

    await sortIn(start, left - 1);
    await sortIn(left + 1, end);
  }

  await sortIn(0, arr.length - 1);
}

// 归并排序
export function mergeSort(arr) {
  return sort(0, arr.length);

  // 前闭后开区间
  function sort(start, end) {
    if (start === end) {
      return [arr[start]];
    }
    const mid = Math.floor((start + end) / 2);
    const left = sort(start, mid);
    const right = sort(mid + 1, end);

    let result = [];
    let l = 0;
    let r = 0;
    // 合并两个有序数组
    while (l < left.length && r < right.length) {
      if (left[l] < right[r]) {
        result.push(left[l]);
        l++;
      } else {
        result.push(right[r]);
        r++;
      }
    }

    if (l === left.length) {
      result = result.concat(right.slice(r));
    } else {
      result = result.concat(left.slice(l));
    }

    return result;
  }
}
