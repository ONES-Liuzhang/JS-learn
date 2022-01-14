export default function withConsole(wrapComponent) {
  return {
    mounted() {
      console.log(`component ${wrapComponent.name} mounted`);
    },
    render(h) {
      // const instance = this.$vnode.componentInstance;
      // const h = instance.$parent.$createElement;
      const slots = Object.keys(this.$slots).map((key) => {
        return this.$slots[key];
      });
      return h(
        wrapComponent,
        {
          attrs: this.$attrs,
          scopedSlots: this.$scopedSlots,
          on: this.$listeners,
        },
        slots
      );
    },
  };
}
