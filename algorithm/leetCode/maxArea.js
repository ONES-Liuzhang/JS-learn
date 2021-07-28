var maxArea = function (height) {
  // 2. 双指针
  let max = 0;
  let l = 0;
  let r = height - 1;

  while (l < r) {
    max = Math.max(Math.min(height[l], height[r]) * (r - l), max);
    if (height[l] <= height[l + 1]) l++;
    else if (height[r] <= height[r - 1]) r--;
    else if (height[l + 1] >= height[r - 1]) l++;
    else if (height[l + 1] < height[r - 1]) r--;
  }

  return max;
};

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
