import { Component, Vue, Prop } from 'vue-property-decorator'
import style from './index.module.less'
const noop = () => { }
@Component({ functional: true })
export default class RgPaSelect extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    const { props, listeners } = context
    const { label, active } = props
    return (
      <div
        onClick={listeners.click || noop}
        class={[style.box, active ? style.active : '']}
      >
        {label || '--'}
      </div>
    )
  }

}

