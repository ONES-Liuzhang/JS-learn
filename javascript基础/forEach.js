Array.prototype.forEach = function ArrayForEach(fn, thisArgs) {
  let O = this;
  let len = O.length;
  if (typeof fn !== "function") {
    throw new TypeError("fn 必须是个函数");
  }
  let k = 0;
  while (k < len) {
    if (Object.prototype.hasOwnProperty.call(O, k)) {
      const kValue = O[k];
      fn.call(thisArgs, kValue, k, O);
    }
    k++;
  }
};

Map.prototype.forEach = function MapForEach(fn, thisArgs) {
  const M = this;
  if (typeof M !== "object") {
    throw TypeError("类型错误！");
  }
  // TODO：If M does not have a [[MapData]] internal slot, throw a TypeError exception.
  if (typeof fn !== "function") {
    throw new TypeError("fn 必须是个函数");
  }

  for (let [key, val] of M.entries()) {
    fn.call(thisArgs, val, key, M);
  }
};

Set.prototype.forEach = function SetForEach(fn, thisArgs) {
  const S = this;
  if (typeof S !== "object") {
    throw TypeError("类型错误！");
  }
  // TODO: If S does not have a [[SetData]] internal slot, throw a TypeError exception.
  if (typeof fn !== "function") {
    throw new TypeError("fn 必须是个函数");
  }

  // Set 的 key === val
  for (let [key, val] of S.entries()) {
    fn.call(thisArgs, val, key, S);
  }
};

let count;

count = 0;
const set = new Set([1, 2, 3]);
set.forEach((s) => {
  count++;
  if (count > 10) {
    throw new Error("循环啦");
  }
  set.delete(s);
  set.add(s);
});
