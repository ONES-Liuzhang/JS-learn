/* eslint-disable indent */
import { Component, Vue, Watch } from 'vue-property-decorator'
import classnames from 'classnames'
import style from './index.module.less'
import { CreateElement } from 'vue'


@Component({ functional: true })
export default class Sort extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    const { props } = context
    return <div class={style.box}>
      <div class={style.up}></div>
      <div class={style.down}></div>
    </div>

  }
}
