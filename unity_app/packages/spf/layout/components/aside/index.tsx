import { Component, Vue, Prop } from 'vue-property-decorator'

import style from './index.module.less'
@Component({})
export default class BaseLayoutAside extends Vue {
  @Prop({ type: Number, default: 1 }) private opacity!: number  // 透明度
  private render() {
    return (
      <div class={style.box} >
        侧边栏
      </div>
    )
  }
}
