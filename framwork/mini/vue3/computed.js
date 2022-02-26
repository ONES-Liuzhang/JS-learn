const { effect, track, trigger } = require("./effect.js");

function computed(fn) {
  let value;
  let dirty = true;

  const effectFn = effect(fn, {
    lazy: true,
    scheduler() {
      if (!dirty) {
        dirty = true;
        trigger(obj, "value");
      }
    },
  });

  const obj = {
    get value() {
      if (dirty) {
        dirty = false;
        value = effectFn();
        track(obj, "value");
      }
      return value;
    },
  };

  return obj;
}

module.exports = {
  computed,
};
