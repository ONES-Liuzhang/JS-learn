import { Component, Vue } from 'vue-property-decorator'
import style from './index.module.less'
import { CreateElement } from 'vue'


@Component({})
export default class User extends Vue {
  // private isShow = false
  private visible = false
  // handleClickLogin() {
  //   this.visible = true
  // }
  private render(h: CreateElement) {
    return <a-dropdown trigger={['click']} vModel={this.visible}>
      <a-button >登入</a-button>
      <div slot="overlay" >
        {/* {h(Login)} */}
      </div>
    </a-dropdown>
  }
}
