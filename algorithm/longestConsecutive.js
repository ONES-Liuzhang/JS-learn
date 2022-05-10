/**
 * @param {number[]} nums
 * @return {number}
 *
 * 128. 最长连续序列
 *
 * https://leetcode-cn.com/problems/longest-consecutive-sequence/
 *
 */
var longestConsecutive = function (nums) {
  const map = {};
  let max = 0;

  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    let pre = curr - 1;
    let next = curr + 1;

    // 重复的数不增长序列
    if (curr in map) continue;

    currCount = map[curr] = 1;

    if (map[pre]) currCount += map[pre];
    if (map[next]) currCount += map[next];

    map[curr] = currCount;
    // 更新
    while (map[pre]) {
      map[pre] = currCount;
      pre--;
    }
    while (map[next]) {
      map[next] = currCount;
      next++;
    }

    max = Math.max(max, currCount);
  }
  console.log(map);
  return max;
};

// longestConsecutive([4, 100, 200, 1, 3, 2]);
longestConsecutive([1, 2, 0, 1]);
