// 接雨水
// 1. 双指针
function trap(height) {
  let l = 0;
  let r = height.length - 1;

  let lMax = height[0];
  let rMax = height[r];

  let res = 0;

  while (l < r) {
    if (lMax < rMax) {
      l++;
      res += Math.max(lMax - height[l], 0);
      lMax = Math.max(height[l], lMax);
    } else {
      r--;
      res += Math.max(rMax - height[r], 0);
      rMax = Math.max(height[r], rMax);
    }
  }

  return res;
}

// 2. 单调递减栈
function trapStack(height) {
  const stack = [];
  let res = 0;

  for (let i = 0; i < height.length; i++) {
    let len = stack.length;
    while (len > 0 && height[stack[len - 1]] < height[i]) {
      let curr = stack.pop();
      len--;
      if (len === 0) break;
      let l = stack[len - 1];
      let h = Math.min(height[l], height[i]) - height[curr];
      res += (i - l - 1) * h;
    }
    stack.push[i];
  }
  return res;
}

trapStack([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
