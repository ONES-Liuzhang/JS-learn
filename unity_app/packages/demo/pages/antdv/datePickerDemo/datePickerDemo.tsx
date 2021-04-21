import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
@Component
class DatePickerDemo extends Vue {
  private onChange(date: Date, dateString: string) {
    console.log(date, dateString)
  }
  private render() {
    return (
      <div class={style.box}>
        <div class="block">
          <a-date-picker onChange={this.onChange} />
          <br />
          <a-month-picker onChange={this.onChange} placeholder="Select month" />
          <br />
          <a-range-picker onChange={this.onChange} />
          <br />
          <a-week-picker onChange={this.onChange} placeholder="Select week" />
        </div>
      </div>
    )
  }
}

export default DatePickerDemo
