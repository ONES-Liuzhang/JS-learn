import { Component, Vue, Watch } from 'vue-property-decorator'
import style from './index.module.less'

@Component({ functional: true })
export default class Block extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    const { data, scopedSlots, children, props } = context

    return <div>
      <div class={style.box}>
        <div class={style.title}>{props.title}</div>
        {context.slots().default}
      </div>
    </div>
  }
}
