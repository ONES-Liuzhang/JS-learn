import { Component, Vue, Watch } from 'vue-property-decorator'
import classnames from 'classnames'
import style from './index.module.less'
import { CreateElement } from 'vue'


@Component({})
export default class CityPicker extends Vue {
  private value = ''
  private showValue = ''
  private render(h: CreateElement) {
    return (
      <div class={style.box}>
        <a-row gutter="10">
          <a-col span="8">
            <a-select defaultValue="0" class={style.select_group}>
              <a-select-option value="0">请选择</a-select-option>
              <a-select-option value="1">北京市</a-select-option>
            </a-select >
          </a-col>
          <a-col span="8">
            <a-select defaultValue="0" class={style.select_group}>
              <a-select-option value="0">请选择</a-select-option>
              <a-select-option value="1">北京市</a-select-option>
            </a-select >
          </a-col>
          <a-col span="8">
            <a-select defaultValue="0" class={style.select_group}>
              <a-select-option value="0">请选择</a-select-option>
              <a-select-option value="1">北京市</a-select-option>
            </a-select >
          </a-col>
        </a-row >
      </div >
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
