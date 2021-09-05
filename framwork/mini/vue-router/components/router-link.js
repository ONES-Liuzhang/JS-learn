export default {
  name: "RouterLink",
  props: {
    to: {
      type: [String, Object],
      require: true,
    },
  },
  computed: {
    href() {
      // TODO:: to没有使用path 而是使用name，要match name
      const path = typeof this.to === "string" ? this.to : this.to.path;
      return this.$router.mode === "hash" ? `#/${path}` : path;
    },
  },
  render(h) {
    return h(
      "a",
      {
        attrs: {
          href: this.href,
        },
      },
      this.$slots.default
    );
  },
};
