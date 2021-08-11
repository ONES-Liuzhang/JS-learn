/**
 * 快速排序
 * 思路：基于“分治”法
 * 1. 选择一个“基准值”，每次循环都把数组分为两部分 [小数组, 基准值, 大数组]
 * 2. 对小数组和大数组进行同样的操作，最终获得一个有序数组
 * 和归并排序的区别在于，快排直接在原数组上进行操作
 * 时间复杂度O(nlogn)
 */
// 以数组第一个数为基准值
function quickSort(nums) {
  sortIn(0, nums.length - 1);

  return nums;
  function sortIn(i, j) {
    // 边界条件
    if (i >= j) return;

    // 基准值
    const start = i;
    const end = j;
    let base = nums[start];
    while (i < j) {
      while (i < j && nums[j] > base) j--;
      while (i < j && nums[i] <= base) i++;
      if (i === j) {
        break;
      } else {
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }

    [nums[i], nums[start]] = [nums[start], nums[i]];

    // 左数组递归排序
    sortIn(start, i - 1);
    // 右数组递归排序
    sortIn(i + 1, end);
  }
}

console.log(quickSort([2, 2, 1, 1, -1, 8, 3, 5, 2]));
