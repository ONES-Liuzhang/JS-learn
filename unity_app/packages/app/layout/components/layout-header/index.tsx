import { Component, Vue, Prop } from 'vue-property-decorator'
import style from './index.module.less'

import Logo from './components/logo'
import Menu from './components/menu'
import LayoutUser from '@/user/components/outer/layout-user'

@Component({ functional: true })
export default class LayoutHeader extends Vue {
  private render() {
    return (
      <div class={style.box} >
        <div class={[style.inner, 'main-inner']}>
          <Logo />
          <Menu />
          <div class={style.right}>
            <LayoutUser />
          </div>

        </div>
      </div>
    )
  }
}
