<template>
  <div>
    <div @click="onRootClick">
      <span>{{ prefix }}</span>
      <span>{{ root.title }}</span>
    </div>
    <div v-for="item in treeChildren" :key="item.id">
      <TreeItem :root="item" />
    </div>
  </div>
</template>
<script>
import { getTreeById } from "./api/tree";
export default {
  name: "TreeItem",
  props: {
    root: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      treeChildren: [],
    };
  },
  computed: {
    prefix() {
      const { rank } = this.root;
      let result = "-";
      for (let i = 0; i < rank; i++) {
        result += "-";
      }
      return result;
    },
  },
  methods: {
    async onRootClick() {
      // TODO::判断是否要获取children
      if (this.treeChildren.length > 0) return;
      const { rank } = this.root;
      this.treeChildren = await getTreeById(rank);
    },
  },
};
</script>
