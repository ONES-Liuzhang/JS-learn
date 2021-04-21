import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class LazyRenderBox extends Vue {

  @Prop() public hiddenClassName!: string
  @Prop() public visible!: boolean

  render() {
    const { hiddenClassName, visible } = this.$props
    let children = null
    if (hiddenClassName || !this.$slots.default || this.$slots.default.length > 1) {
      const cls = ''
      if (!visible && hiddenClassName) {
        // cls += ` ${hiddenClassName}`
      }
      children = <div class={cls}>{this.$slots.default}</div>
    } else {
      // eslint-disable-next-line prefer-destructuring
      children = this.$slots.default[0]
    }
    return children
  }
}
