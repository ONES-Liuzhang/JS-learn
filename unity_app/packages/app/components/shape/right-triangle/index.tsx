/* eslint-disable indent */
import { Component, Vue, Watch } from 'vue-property-decorator'
import classnames from 'classnames'
import style from './index.module.less'
import { CreateElement } from 'vue'
// quadrant 象限


@Component({ functional: true })
export default class RightTriangle extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    const { props } = context

    const { width = 10, height = 20, bgc = `#F56515`, quadrant = 3 } = props
    let borderColor
    switch (Number(quadrant)) {
      case 1:
        borderColor = `transparent transparent ${bgc}  ${bgc}`
        break
      case 2:
        borderColor = `transparent ${bgc} ${bgc} transparent `
        break
      case 3:
        borderColor = `${bgc} ${bgc} transparent transparent `
        break
      case 4:
        borderColor = `${bgc} transparent transparent ${bgc}`
        break
      default:
        break
    }
    return <div class={[style.box, style[`t${quadrant}`], context.data.class]} style={{
      ...(context.data.style as {}),
      borderWidth: `${height}px ${width}px`,
      borderColor,
      // backgroundColor: bgc,
    }}>

    </div>
  }
}
