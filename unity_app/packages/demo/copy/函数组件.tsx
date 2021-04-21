import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'

@Component({ functional: true })
export default class 函数组件 extends Vue {
  public render(h: CreateElement, context: RenderContext) {
    const { data, scopedSlots, children, props } = context
    return (
      <div>
        函数组件
      </div>
    )
  }
}
