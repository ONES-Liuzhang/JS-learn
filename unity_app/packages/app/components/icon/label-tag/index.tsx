/* eslint-disable indent */
import { Component, Vue } from 'vue-property-decorator'
import style from './index.module.less'


@Component({ functional: true })
export default class LabelTag extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    const { props, data } = context
    const { text } = props
    return <div class={[style.box, data.class]} >
      <div class={style.inner}>{text}</div>
    </div >
  }
}
