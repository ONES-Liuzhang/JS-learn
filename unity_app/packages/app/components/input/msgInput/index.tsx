import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import classnames from 'classnames'
import style from './index.module.less'
import { CreateElement } from 'vue'


@Component({})
export default class MsgInput extends Vue {
  @Prop(String) value = ''
  private render(h: CreateElement) {
    return (
      <a-input placeholder="短信验证码"
        required={true}
      // value={this.value} 
      >
        <span slot="suffix" class={style.code}>获取验证码</span>
      </a-input>

    )
  }

}
