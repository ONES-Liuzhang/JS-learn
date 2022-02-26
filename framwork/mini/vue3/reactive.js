const { track, trigger } = require("./effect.js");

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key);
      return target[key];
    },
    set(target, key, val) {
      target[key] = val;
      trigger(target, key);
    },
  });
}

module.exports = {
  reactive,
};
