import { Component, Vue, Prop } from 'vue-property-decorator'
import style from './index.module.less'

@Component({ functional: true })
export default class RgModal extends Vue {
  // @Prop() info!: any
  private render(h: CreateElement, context: RenderContext) {
    const info = context.props
    const click = context.listeners.click || function () { }
    return (
      <div class={style.box}>
        <h1>{info.name}</h1>
        <h1>{info.age}</h1>
        <a-button onClick={click}>
          点击测试
        </a-button>
        <a-button onClick={context.listeners.close}>关闭</a-button>
      </div>
    )
  }
}

