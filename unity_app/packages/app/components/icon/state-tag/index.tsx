/* eslint-disable indent */
import { Component, Vue, Watch } from 'vue-property-decorator'
import classnames from 'classnames'
import style from './index.module.less'
import { CreateElement } from 'vue'


@Component({ functional: true })
export default class StateTag extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    const { props } = context
    const { title, color, w } = props
    return <div class={style.box} style={{ color }}>
      <div class={style.title}>{title}</div>
      <a-icon component={require('./base.svg').default} style={{ fontSize: `${w}px` }} />
    </div >
  }
}
