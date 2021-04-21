import { Component, Vue } from 'vue-property-decorator'
import style from './index.module.less'
import LoginBox from './components/login-box'

@Component({ functional: true })
export default class Login extends Vue {
  private render(h: CreateElement) {
    return (
      <div class={style.box} >
        <div class={style.inner}>
          <LoginBox></LoginBox>
        </div>
      </div>
    )
  }
}
