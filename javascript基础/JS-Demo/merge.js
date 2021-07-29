// 合并parent和child
function mergeOptions(parent, child, vm) {
  for (key in child) {
    parent[key] = child[key];
  }
  vm.options = child;
  return child;
}

function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g;
const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});

let a = "prop-test";
console.log(camelize(a));
