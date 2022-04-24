/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  return searchIn(0, nums.length - 1, target);

  // 查找target
  function searchIn(start, end, target) {
    // 递归终止条件
    if (start > end) return -1;

    const mid = start + ((end - start) >> 1);

    if (target === nums[mid]) {
      return mid;
    }

    // target 在左递增区间 target 0
    if (nums[mid] >= nums[start]) {
      if (target >= nums[start] && target < nums[mid]) {
        return searchIn(start, mid - 1, target);
      } else {
        return searchIn(mid + 1, end, target);
      }
    } else {
      if (target > nums[mid] && target <= nums[end]) {
        return searchIn(mid + 1, end, target);
      } else {
        return searchIn(start, mid - 1, target);
      }
    }
  }
};

console.log(search([1, 3], 3));
