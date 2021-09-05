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
      let path = typeof this.to === "string" ? this.to : this.to.path;
      path = this.$router.mode === "hash" ? `#/${path}` : path;
      return path.replace(/\/\//g, "/");
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
