var minimumOperations = function (leaves) {
  let arr = leaves.split("");

  let left = arr.indexOf("y");
  let right = arr.lastIndexOf("y");

  let center = arr.splice(left, right + 1);

  let result = 0;
  console.log(left, right, arr);

  center.forEach((s) => {
    if (s === "r") result++;
  });
  return result;
};

console.log(minimumOperations("rrryyyrryyyrr"));
