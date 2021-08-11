// 二分查找法
// 1. 前闭后闭区间 [i, j] - 终止条件 l < r
// 因为当 l = r 时 不确定 nums[r] 是否为目标值
function binarySearch(arr, val) {
  let l = 0;
  let r = arr.length - 1;
  while (l < r) {
    let mid = Math.floor((l + r) / 2);
    if (arr[mid] < val) {
      l = mid + 1;
    } else if (arr[mid] > val) {
      r = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}

// 2. 前闭后开区间 [i, j) - 终止条件 l <= r
function binarySearch2(arr, val) {
  let l = 0;
  let r = arr.length;
  // 可能出现arr为空的情况进入循环，要改变if的判断顺序
  // 因为 1 < undefined => false; 1 > undefined => false
  // else 中要对这种情况进行兼容，使用 l = mid + 1， 顺序不一致可能导致死循环
  while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    if (val === arr[mid]) return mid;
    else if (val < arr[mid]) r = mid;
    else l = mid + 1;
  }
  return -1;
}

console.log(binarySearch([0, 1, 2, 3, 4, 5, 6, 7], 1));
