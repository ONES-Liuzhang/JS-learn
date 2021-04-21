import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'

@Component({ functional: true })
export default class selFile extends Vue {
  public render(h: CreateElement, context: RenderContext) {
    const { data, scopedSlots, children, props } = context
    return (
      <div class={style.box}>
        <a-icon type="plus" class={style.icon}></a-icon>
        <div class={style.text}>{props.text || '点击上传'}</div>
      </div>
    )
  }
}

