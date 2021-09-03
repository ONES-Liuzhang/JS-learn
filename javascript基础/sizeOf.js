// TODO 非递归写法 迭代？
// 防止引用值内存的重复计算
const seen = new WeakSet();

/** 计算object占用的字节数 */
function sizOfObject(obj) {
  if (obj === null) return 0;

  let bytes = 0;

  const properties = Object.keys(obj);

  for (let i = 0; i < properties.length; i++) {
    const key = properties[i];
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if (seen.has(obj[key])) {
        continue;
      }
      seen.add(obj[key]);
    }

    bytes += calculator(key);
    bytes += calculator(obj[key]);
  }

  return bytes;
}

function calculator(obj) {
  const objType = typeof obj;
  switch (objType) {
    case "number":
      return 8;
    case "string":
      return obj.length * 2;
    case "boolean":
      return 4;
    case "object":
      if (Array.isArray(obj)) {
        return obj.map(calculator).reduce((curr, next) => curr + next, 0);
      } else {
        return sizOfObject(obj);
      }
    default:
      return 0;
  }
}

console.log(calculator(123)); // 8
console.log(calculator("123")); // 6
console.log(calculator(true)); // 4
console.log(calculator([1, 2, "3"])); // 8 + 8 + 2 = 18
console.log(
  calculator({
    m: "ha",
  })
); // 2 + 4 = 6
console.log(
  calculator({
    a: false, // 2 + 4 = 6
    b: [1, 2, 3], // 2 + 8 * 3 = 26
    c: {
      // 2 + 6 = 8
      m: "ha",
    },
  })
);
