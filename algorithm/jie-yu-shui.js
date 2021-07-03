// 传入一个数组，是一个位置index表示x轴，值表示y轴高度的柱形图
// 计算这些柱子能接水的总体积
// 细化问题
// 暴力解法
// 时间复杂度O(n^2) 空间复杂度O(1)
function trap1(arr) {
  // 边界条件
  if (arr.length <= 2) return 0;

  let result = 0;

  for (let i = 1; i < arr.length; i++) {
    let lMax = arr[0];
    let rMax = arr[arr.length - 1];

    for (let j = 0; j < i; j++) {
      lMax = Math.max(lMax, arr[j]);
    }

    for (let k = arr.length - 2; k > i; k--) {
      rMax = Math.max(rMax, arr[k]);
    }

    result += Math.max(Math.min(lMax, rMax) - arr[i], 0);
  }

  return result;
}

console.log(trap1([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));

// 优化，备忘录添加缓存
// lMax[i] = Math.max(lMax[i-1], height[i-1])
// rMax[i] = Math.max(rMax[i+1], height[i+1])
// 时间复杂度O(n) 空间复杂度O(n)
function trap2(height) {
  if (height.length <= 2) return 0;

  const lMax = [];
  const rMax = [];

  // 初始化
  lMax[0] = 0;
  rMax[height.length - 1] = 0;

  for (let i = 1; i < height.length; i++) {
    lMax[i] = Math.max(lMax[i - 1], height[i - 1]);
  }

  for (let i = height.length - 2; i >= 0; i--) {
    rMax[i] = Math.max(rMax[i + 1], height[i + 1]);
  }

  let result = 0;
  for (let i = 0; i < height.length; i++) {
    result += Math.max(Math.min(lMax[i], rMax[i]) - height[i], 0);
  }

  return result;
}

console.log(trap2([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));

// 双指针 时间复杂度O(n) 空间复杂度O(1)
function trap3(height) {
  if (height.length <= 2) return 0;
  const n = height.length;
  let res = 0;

  // 定义双指针
  let left = 0;
  let right = n - 1;

  let lMax = height[left];
  let rMax = height[right];

  while (left < right) {
    if (lMax < rMax) {
      // 计算左指针
      left++;
      res += Math.max(lMax - height[left], 0);
      lMax = Math.max(lMax, height[left]);
    } else {
      right--;
      res += Math.max(rMax - height[right], 0);
      rMax = Math.max(rMax, height[right]);
    }
  }

  return res;
}

console.log(trap3([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
