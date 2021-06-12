// 找出一个无序数组中第K大的数
function getLeastNumbers(arr, k) {
  if (k >= arr.length) return arr;
  let k1 = partition(arr, 0, arr.length);
  while (k1 < k) {
    k1 = partition(arr, k1 + 1, arr.length);
  }
  return arr.slice(0, k);
}

// 快排切分 返回排序结束时被选择元素的位置
// 双指针 使用前闭后开区间 [left, right)
function partition(arr, left, right) {
  let v = arr[left];
  while (left < right) {
    while (arr[right - 1] > v) right--;
    while (arr[left] < v) left++;
    // 交换
    [arr[left], arr[right - 1]] = [arr[right - 1], arr[left]];
  }
  return left;
}

// console.log(getLeastNumbers([1, 2, 3, 4, 5, 6, 7, 0], 3));

function partition2(nums, lo, hi) {
  let v = nums[lo];
  let i = lo;
  let j = hi + 1;
  while (true) {
    while (++i <= hi && nums[i] < v);
    while (--j >= lo && nums[j] > v);
    if (i >= j) {
      break;
    }
    let t = nums[j];
    nums[j] = nums[i];
    nums[i] = t;
  }
  nums[lo] = nums[j];
  nums[j] = v;
  return j;
}

console.log(partition2([1, 0, 2, 0], 0, 3));
