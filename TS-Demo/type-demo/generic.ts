interface Dictionary<T = any> {
  [key: string]: T;
}

type StrDict = Dictionary<string>;

type DictMember<T> = T extends Dictionary<infer V> ? V : never;

type StrDictMember = DictMember<StrDict>; // string

// 应用：获取Promise返回值类型
async function stringPromise() {
  return "string";
}

interface Person {
  name: string;
  age: number;
}

async function personPromise() {
  return { name: "name", age: 22 } as Person;
}

type PromiseFn<T> = (args: any[]) => Promise<T>;
type PromiseType<T> = T extends PromiseFn<infer V> ? V : never;

// 拿到Promise的参数类型
type extractStringPromise = PromiseType<typeof stringPromise>;
type extractPersonPromise = PromiseType<typeof personPromise>;
