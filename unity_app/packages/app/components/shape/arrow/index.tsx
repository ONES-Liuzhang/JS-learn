/* eslint-disable indent */
import { Component, Vue, Watch } from 'vue-property-decorator'
import classnames from 'classnames'
import style from './index.module.less'
import { CreateElement } from 'vue'


@Component({ functional: true })
export default class Arrow extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    const { props } = context

    const direction = props.direction || 'left'
    const arrowNode = <span class={style.arrow}>
      <span class={[style.t1]}></span>
      <span class={[style.t2]}></span>
    </span>
    switch (direction) {
      case 'left': {
        return (
          <div class={[style.box, style[direction]]}>
            <span class={[style.line, style[direction]]}></span>
            {arrowNode}
          </div >
        )
      }
      case 'right': {
        return (
          <div class={[style.box, style[direction]]}>
            <span class={[style.line, style[direction]]}></span>
            {arrowNode}
          </div >
        )
      }
      case 'up': {
        return (
          <div class={[style.box, style[direction]]}>
            <span class={[style.vLine, style[direction]]}></span>
            {arrowNode}
          </div >
        )
      }
      case 'down': {
        return (
          <div class={[style.box, style[direction]]}>
            <span class={[style.vLine, style[direction]]}></span>
            {arrowNode}
          </div >
        )
      }
      default:
        return null
    }
  }
}
