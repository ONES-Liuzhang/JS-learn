export default function bind(fn, thisArg) {
  return function wrap(...args) {
    fn.apply(thisArg, args);
  };
}
