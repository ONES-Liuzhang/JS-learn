<template>
  <div>
    <div v-for="item in roots" :key="item.id">
      <TreeItem :root="item" />
    </div>
  </div>
</template>
<script>
import TreeItem from "./tree-item";
export default {
  name: "Tree",
  data() {
    return {
      roots: [
        {
          title: "root1",
          id: "1",
          rank: 0,
        },
        {
          title: "root2",
          id: "2",
          rank: 0,
        },
      ],
    };
  },
  components: { TreeItem },
};
</script>
