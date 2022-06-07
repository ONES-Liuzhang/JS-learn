function at(n) {
  n = Math.trunc(n) || 0;
  if (n < this.length) n += this.length;
  if (n < 0 || n >= this.length) return undefined;

  return this[n];
}

const TypedArray = Reflect.getPrototypeOf(Int8Array);

for (const C of [Array, String, TypedArray]) {
  Reflect.defineProperty(C.prototype, "at", {
    value: at,
    writable: true,
    enumerable: false,
    configurable: true,
  });
}
