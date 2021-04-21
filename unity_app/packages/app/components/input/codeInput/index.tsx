import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import classnames from 'classnames'
import style from './index.module.less'
import { CreateElement } from 'vue'


@Component({})
export default class CodeInput extends Vue {
  @Prop(String) value = ''
  private render(h: CreateElement) {
    return (
      <div class={style.codeFormItem}>
        <a-input placeholder="图形验证码" type="text"
          class={style.left} required={true} />
        <div slot="suffix" class={style.codeImg} onClick={this.handleClickCode}>
          <img src="./components/images/timg.jpeg" />
        </div>
      </div>
    )
  }
  private handleClickCode() {

  }
}
