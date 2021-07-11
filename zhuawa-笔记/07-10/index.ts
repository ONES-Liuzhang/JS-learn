// enum
enum MStatus {
  PENDING,
  FULFILLED,
  REJECTED,
}

// interface
interface UserInfo1 {
  name?: string;
}

// type
type UserInfo2 = {
  width: number;
};

// | 联合类型 最终只选择一个

// & 交叉类型

// typeof
function toArray(x: number): Array<number> {
  return [x];
}
type obj = typeof toArray;

// keyof

// in

// extends

// Partial 把类型T转化为可选
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// Required
type MyRequired<T> = {
  [K in keyof T]: T[K];
};

// Readonly 只读属性
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Record Record<K extends keyof any, T> 把K中所有属性的值，转化为T类型
type MyRecord<K, T> = {
  [key in keyof K]: T;
};

// Exclude Exclude<T, U> 将T类型中属于U类型的值移除掉
type MyExclude<T, U> = {};

// Extract<T, U> 从T中提取出U， 大概就是取T 和 U的交集的意思
type MyExtract<T, U> = {};
