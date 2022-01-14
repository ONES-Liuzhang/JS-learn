<template>
  <div>
    <h1>TODO</h1>
    <TodoList v-bind:todos="todos">
      <template v-slot:todo="{ todo }">
        <span>{{ todo.content }}</span>
        <span>{{ todo.complete ? "✅" : "⌛️" }}</span>
      </template>
    </TodoList>
  </div>
</template>
<script>
import TodoList from "./todo-list.vue";

export default {
  name: "Todo",
  data() {
    return {
      todos: [
        {
          id: 1,
          content: "吃饭",
          complete: true,
        },
        {
          id: 2,
          content: "睡觉",
          complete: true,
        },
        {
          id: 3,
          content: "打豆豆",
          complete: true,
        },
        {
          id: 4,
          content: "搬砖",
          complete: false,
        },
        {
          id: 4,
          content: "搬砖",
          complete: true,
        },
      ],
    };
  },
  components: { TodoList },
};
</script>
<style lang="scss" scoped></style>
