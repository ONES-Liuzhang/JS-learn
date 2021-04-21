import { Component, Vue } from 'vue-property-decorator'
import style from './layout.module.less'
import classnames from 'classnames'
import Aside from './components/aside'
import { topMenuMixin } from '@/app/layout/mixins'
@Component({ mixins: [topMenuMixin] })
export default class Layout extends Vue {
  private render() {
    return (
      <div class={classnames(style.box)}>
        <Aside></Aside>
        <div class={style.content}>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>

        </div>
      </div>
    )
  }
}
