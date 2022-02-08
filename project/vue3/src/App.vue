<template>
  <div>
    <button @click="decreament">-</button>
    <p>{{ count }}</p>
    <button @click="increament">+</button>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "App",
  setup() {
    const count = ref(0);

    watch((onInvalidate) => {
      console.log(onInvalidate);
      onInvalidate(() => {
        console.log("onInvalidate");
      });
      return count;
    });

    function increament() {
      count.value++;
    }

    function decreament() {
      count.value--;
    }

    return {
      count,
      increament,
      decreament,
    };
  },
};
</script>
