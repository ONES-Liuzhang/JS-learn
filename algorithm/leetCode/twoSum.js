// 两数之和
var twoSum = function (nums, target) {
  const dict = new Map();

  for (let i = 0; i < nums.length; i++) {
    const diff = dict.get(target);
    if (diff == undefined) dict.set(target - nums[i], i);
    else return [nums[diff], nums[i]];
  }
  return [];
};

console.log(twoSum([1, 2, 3, 4], 5));
