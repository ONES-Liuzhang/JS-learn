<template>
  <div v-if="list.length">
    <div v-for="item in list" :key="item.id">{item.name}</div>
  </div>
</template>
<script>
export default {
  name: "ml-message",
  data() {
    return {
      list: [],
    };
  },
  methods: {
    add() {},
    remove() {},
  },
};
</script>
