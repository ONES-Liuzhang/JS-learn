import { Component, Vue } from 'vue-property-decorator'
import style from './index.module.less'

import { state } from '@/user/store'
import { show as showPopLogin } from '@/user/pages/login/pop-login'
import { go as loginGo } from '@/user/pages/login'

@Component({})
export default class LayoutUser extends Vue {

  private render(h: CreateElement) {
    if (!state.isLogin) {
      return <div class={style.box}>
        <a-Button onClick={this.handleClick}>登入</a-Button>
      </div>
    }
    return <div class={style.box}>
      <div class={style.avatar}></div>
      <div class={style.info}>
        <div class={style.name}>李雷</div>
        <div class={style.department}>资金同业部</div>
      </div>
    </div>
  }
  private handleClick() {
    loginGo()
  }
}
