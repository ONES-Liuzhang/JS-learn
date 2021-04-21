import { Component, Prop, Vue } from 'vue-property-decorator'
import LazyRenderBox from './lazy-render-box'

@Component
export default class PopupInner extends Vue {

  @Prop({ default: '' }) public hiddenClassName!: string
  @Prop() public visible!: boolean

  render() {
    const { prefixCls, visible, hiddenClassName } = this.$props
    const { $listeners } = this
    const divProps = { on: $listeners }

    return (
      <div {...divProps} class={!visible ? hiddenClassName : ''}>
        <LazyRenderBox class={`${prefixCls}-content`} visible={visible}>
          {this.$slots.default}
        </LazyRenderBox>
      </div>
    )
  }
}
