<template>
  <div class="dialog-wrap">
    <div class="title">{{ title }}</div>
    <div class="content-wrap"></div>
  </div>
</template>
<script>
const Confirm = {
  name: "Confirm",
  props: ["text", "title", "onConfirm"],
};

export default Confirm;

const instanceCache = null;
export function confirm(title, text, onConfirm) {
  let ConfirmCtor = Vue.extend(Confirm);
  let getInstance = () => {
    if (!instanceCache) {
      instanceCache = new ConfirmCtor({
        propsData: {
          title,
          text,
          onConfirm,
        },
      });
      instanceCache.$mount();
      let el = instanceCache.$el;
      document.body.appendChild(el);
    } else {
      instanceCache.text = text;
      instanceCache.title = title;
      instanceCache.onConfirm = onConfirm;
    }
  };

  getInstance();
}
</script>
<style lang="scss" scoped>
.dialog-wrap {
  position: absolute;
}
</style>
