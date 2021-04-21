import { Component, Vue, Watch } from 'vue-property-decorator'
import classnames from 'classnames'
import style from './index.module.less'
import { CreateElement } from 'vue'


@Component({})
export default class PhoneInput extends Vue {
  private value = ''
  private showValue = ''
  private render(h: CreateElement) {
    return (
      <div class={style.box}>

        <a-input
          maxLength={11}
          minLength={11}
          placeholder='请输入手机号码'
          value={this.showValue}
          onChange={this.handlePhoneChange} />
      </div>
    )
  }
  private handlePhoneChange(e: Event) {
    let target = e.target as HTMLInputElement
    let value = target.value.trim()
    value = value.replace(/[^\d\s]/g, '') // 匹配数字
    this.value = value
  }

  @Watch('value')
  private valueChange(val: string) {
    // console.log(val)
    // if (val.length > 8) {
    //   this.showValue = `${val.substr(0, 3)} ${val.substr(3, 8)} ${val.substr(8)}`
    // } else if (val.length > 3) {
    //   this.showValue = `${val.substr(0, 3)} ${val.substr(4)}`
    // } else {
    this.showValue = val
    // }
    // this.$emit('onChange', value)
  }
}
