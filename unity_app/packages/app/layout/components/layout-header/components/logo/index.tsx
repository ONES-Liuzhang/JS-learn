import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import { go as homeGo } from '@/base/pages/home'
import SvgLogo from 'svg/common/logo.svg'
@Component({ functional: true })
export default class Logo extends Vue {
  private render(h: CreateElement) {
    return (
      <div class={style.box} onClick={homeGo}>
        <SvgLogo class={style.svg}></SvgLogo>
      </div>
    )
  }
}
