<template>
  <div @click="handleChange">{{ ccc }}</div>
</template>

<script>
export default {
  name: "LzComp",
  data() {
    return {
      count: 1,
    };
  },
  computed: {
    ccc() {
      return `first ${this.count}`;
    },
  },
  methods: {
    handleChange() {
      this.count++;
    },
  },
};
</script>
<style scoped></style>
