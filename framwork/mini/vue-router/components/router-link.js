export default {
  name: "RouterLink",
  props: {
    to: {
      type: String,
      require: true,
    },
  },
  computed: {
    href() {
      let href = location.href;
      let hashIndex = href.indexOf("#");
      if (hashIndex > 0) {
        let base = href.slice(0, hashIndex);

        return `${base}#${this.to}`;
      }
      return this.to;
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
