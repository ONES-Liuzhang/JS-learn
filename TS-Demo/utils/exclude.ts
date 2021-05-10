// Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉。
type _Exclude<T, U> = T extends U ? never : T;

// example
type T0 = _Exclude<"a" | "b" | "c", "a" | "b">;
