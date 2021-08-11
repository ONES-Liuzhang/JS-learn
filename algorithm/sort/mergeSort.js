/**
 * 归并排序
 * 1. “分治”思想，二分法拆分数组，递归的对每个子数组进行排序
 * 2. 时间复杂度O(nlogn) - 推导公式 F(n) = F(n/2) + F(n/2) + 合并两个数组的时间O(n)
 * 3. 归并排序不会改变原数组，冒泡、选择、插入排序都会改变
 */
function mergeSort(nums) {
  return mergeSortIn(0, nums.length - 1);

  /** 对数组的下标i，j进行排序，前闭后闭区间[i, j] */
  function mergeSortIn(i, j) {
    if (i === j) return [nums[i]];
    let mid = Math.floor((i + j) / 2);
    const left = mergeSortIn(i, mid);
    const right = mergeSortIn(mid + 1, j);

    // 合并有序数组left 和有序数组 right - 双指针法
    const arr = [];
    let l = 0,
      r = 0;
    while (l < left.length && r < right.length) {
      if (left[l] < right[r]) {
        arr.push(left[l]);
        l++;
      } else {
        arr.push(right[r]);
        r++;
      }
    }
    if (l < left.length) return arr.concat(left.slice(l));
    if (r < right.length) return arr.concat(right.slice(r));
  }
}

const nums = [2, 1];
console.log(mergeSort(nums));
console.log(nums);
