// Pick<T, K extends keyof T> 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。
type _Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// example
interface Todo {
  title: string;
  desctiption: string;
  complate: boolean;
}

type TodoPreview = _Pick<Todo, "title" | "complate">;

const todoPreview: TodoPreview = {
  title: "tttt",
  complate: false,
};
