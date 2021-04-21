export default {
  methods: {
    setState(state, callback) {
      Object.assign(this.$data, state)
      this.$nextTick(() => {
        // eslint-disable-next-line no-unused-expressions
        callback && callback()
      })
    },
  },
}
