/* eslint-disable indent */
import { Component, Vue, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import { svgBaseProps, typeMap } from './utils'

@Component({ functional: true })
export default class RgIcon extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    const { props } = context
    let { type, component, spin, rotate } = props


    let RenderComponent = null
    if (component) {
      RenderComponent = component
    } else if (type) {
      RenderComponent = typeMap[type]
      if (type === 'loading') spin = true
    }

    const params = {
      attrs: svgBaseProps,
      class: [spin ? style.spin : ''],
    } as any
    if (rotate) {
      params.style = {
        msTransform: `rotate(${rotate}deg)`,
        transform: `rotate(${rotate}deg)`,
      }
    }
    return <RenderComponent {...params}></RenderComponent>
  }
}
