// isAlive
// destroy
const { types, destroy, isAlive, getSnapshot } = require("mobx-state-tree");
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
      const todos = self.todos.filter((todo) => {
        if (todo.name === name) {
          destroy(todo);
          return false;
        }
        return true;
      });

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

// isAlive store是否还在状态树上
const todo = store.todos[0];
store.removeTodo(todo.name);

// 可以使用 getSnapshot，但是 isAlive 为 false
console.log(getSnapshot(todo)); // { name: 'get up', done: false }
console.log(isAlive(todo)); // false
