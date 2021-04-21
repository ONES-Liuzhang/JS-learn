import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import style from './index.module.less'

@Component({ functional: true })
export default class LoadingShow extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    const { props, data } = context
    const { value, isImg } = props
    let innerNode
    if (isImg) {
      innerNode = <img src={value.url} alt='图片' />
    } else {
      innerNode = <a-icon type="search"></a-icon>
    }
    return <div class={style.box}>
      <a-icon type='loading' class={style.icon}></a-icon>
      <div class={style.text}>上传中...</div>
    </div>
  }
}
