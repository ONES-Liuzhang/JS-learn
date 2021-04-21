import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import classnames from 'classnames'
import { CreateElement } from 'vue'
import style from './index.module.less'
import VerificationCode from '@/app/components/input/verification-code'
@Component({})
export default class LoginBox extends Vue {
  private account = ''
  private pwd = ''
  private isLoading = false  // 按钮的加载效果
  private loginSubmit() {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }


  private render(h: CreateElement) {
    return (

      <div class={style.box} >
        <div class={style.title}>登入</div>
        <a-form>
          <div class={style.formItem}>
            <a-input placeholder="用户号/手机号/身份证号" type="text" vModel={this.account}>
              <a-icon slot="prefix" component={require('svg/common/user.svg').default} />
            </a-input>
          </div>
          <div class={style.formItem}>
            <a-input placeholder="密码" type="password" vModel={this.pwd}>
              <a-icon slot="prefix" component={require('svg/common/lock.svg').default} />
            </a-input>
          </div>

          <div class={classnames(style.formItem, style.codeFormItem)}>
            <VerificationCode ></VerificationCode>
          </div>
        </a-form>

        <a-button block
          onClick={this.loginSubmit}
          loading={this.isLoading}
          type='primary'
          class={classnames(style.formItem, style.loginBtn)}
        >登陆</a-button>

      </div>

    )
  }
}
