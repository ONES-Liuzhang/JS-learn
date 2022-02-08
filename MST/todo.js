const {
  getSnapshot,
  types,
  applySnapshot,
  onSnapshot,
  destroy,
  isAlive,
} = require("mobx-state-tree");
/**
 * model - 预定义了 store
 *
 * types - array, map, maybe, refinements and unions ...
 */
const Todo = types.model({
  name: "",
  done: types.optional(types.boolean, false),
});

const User = types.model({
  name: types.string,
});

const RootStore = types
  .model({
    user: User,
    todos: types.optional(types.array(Todo), []),
  })
  .actions((self) => {
    function addTodo(name) {
      self.todos.push({
        name,
        done: false,
      });
    }

    function removeTodo(name) {
      const todos = self.todos.filter((todo) => todo.name === name);

      self.todos.replace(todos);
    }

    return {
      addTodo,
      removeTodo,
    };
  });

const store = RootStore.create({
  user: {
    name: "Jake",
  },
  todos: [
    {
      name: "get up",
      done: false,
    },
  ],
});

// getSnapshot - 把 store 转换成快照输出 不转的话拿不到store对象
// console.log(getSnapshot(store.user));

// Cannot modify 'AnonymousModel@<root>', the object is protected and can only be modified by using an action.
// 不能直接赋值 ❌
// store.user = {
//   name: "new jack",
// };

// 要通过 applySnapshot 进行重新赋值操作 ✅
// applySnapshot(store.user, {
//   name: "new jack",
// });

store.addTodo("刷牙");
console.log(getSnapshot(store));

// 监听
onSnapshot(store, (snapshot) => {
  console.log("onSnapshot ", snapshot);
});

// applySnapshot - 覆盖原来的 store 会触发 onSnapshot
// applySnapshot(store, {
//   user: {
//     name: "Jake aaa",
//   },
// });
// console.log("applySnapshot", getSnapshot(store));

// destroy 删除store
// destroy(store);

// isAlive store是否还在状态树上
const todo = store.todos[0];
store.removeTodo(todo.name);
console.log(isAlive(todo));
destroy(store);
isAlive(store);
// console.log(isAlive(todo));
