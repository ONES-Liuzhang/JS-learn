// Partial<T> 的作用就是将某个类型里的属性全部变为可选项 ?
type _Partial<T> = {
  [K in keyof T]?: T[K];
};

// example
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: _Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
