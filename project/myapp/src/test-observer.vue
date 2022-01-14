<script>
export default {
  name: "ObserverView",
  data() {
    return {
      useless: 0,
      firstname: "liu",
      lastname: "zhang",
    };
  },
  computed: {
    name() {
      if (this.useless > 0) {
        return `${this.firstname} ${this.lastname}`;
      }
      return "init";
    },
  },
  methods: {
    handleClick() {
      this.useless++;
    },
  },
  // watch: {
  //   left(val, oldVal) {
  //     console.log("left change to ", val);
  //   },
  // },
  render(h) {
    console.log("re-render");
    return h("div", {}, [
      h("p", {}, [this.name]),
      h(
        "button",
        {
          on: {
            click: () => {
              this.handleClick();
            },
          },
        },
        "点我！"
      ),
    ]);
  },
};
</script>
<style scoped>
p {
  font-size: 20px;
}
</style>
