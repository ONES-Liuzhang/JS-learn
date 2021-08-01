var dailyTemperatures = function (temperatures) {
  const queue = [];
  const result = new Array(temperatures.length).fill(0);
  for (let i = 0; i < temperatures.length; i++) {
    if (
      !queue.length ||
      temperatures[queue[queue.length - 1]] >= temperatures[i]
    ) {
      queue.push(i);
    } else {
      while (
        queue.length &&
        temperatures[queue[queue.length - 1]] < temperatures[i]
      ) {
        let currIndex = queue.pop();
        result[currIndex] = i - currIndex;
      }
      queue.push(i);
    }
  }
  return result;
};

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
