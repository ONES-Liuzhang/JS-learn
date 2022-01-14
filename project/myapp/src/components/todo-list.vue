<template>
  <div class="list-container">
    <ul>
      <li v-for="item in filteredList" :key="item.id">
        <slot name="todo" v-bind:todo="item">
          {{ item.content }}
        </slot>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "TodoList",
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    filteredList() {
      // 去重
      let map = {};
      return this.todos
        .map((todo) => {
          if (map[todo.id]) {
            return;
          }
          map[todo.id] = true;
          return todo;
        })
        .filter(Boolean);
    },
  },
};
</script>
