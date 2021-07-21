var search = function (nums, target) {
  if (nums.length < 1) return 0;
  if (nums.length == 1) return nums[0] === target ? 1 : 0;
  let l = 0;
  let r = nums.length - 1;
  let result = 0;
  while (l < r) {
    let mid = Math.floor((l + r) / 2);
    if (nums[mid] < target) {
      l = mid + 1;
    } else if (nums[mid] > target) {
      r = mid - 1;
    } else {
      let flag = mid;
      result++;
      while (flag < r && nums[++flag] === target) result++;
      while (mid > l && nums[--mid] === target) result++;
      return result;
    }
  }
  return result;
};

console.log(search([1, 4], 4));
