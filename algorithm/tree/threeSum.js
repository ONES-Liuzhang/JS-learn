// 三数之和
var threeSum = function (nums) {
  if (nums.length < 3) return [];
  nums.sort((a, b) => a - b);
  const result = [];
  const len = nums.length;
  for (let i = 0; i < len - 2 && nums[i] <= 0; i++) {
    while (i > 0 && nums[i] === nums[i - 1]) i++;
    if (i >= len - 2) break;

    let l = i + 1;
    let r = len - 1;
    while (l < r) {
      if (nums[i] + nums[l] + nums[r] > 0) {
        r--;
        while (l < r && nums[r] === nums[r + 1]) r--;
      } else if (nums[i] + nums[l] + nums[r] < 0) {
        l++;
        while (l < r && nums[l] === nums[l - 1]) l++;
      } else {
        result.push([nums[i], nums[l], nums[r]]);
        l++;
        r--;
        while (l < r && nums[l] === nums[l - 1]) l++;
        while (l < r && nums[r] === nums[r + 1]) r--;
      }
    }
  }
  return result;
};

console.log(threeSum([-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6]));
