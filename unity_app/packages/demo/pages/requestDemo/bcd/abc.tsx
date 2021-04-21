import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'

@Component
export default class Abc extends Vue {
  public render() {
    return <div class={style.box}>abc</div>
  }
}
