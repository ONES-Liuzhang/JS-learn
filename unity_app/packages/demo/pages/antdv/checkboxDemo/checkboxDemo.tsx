import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
@Component
class DividerDemo extends Vue {
  private top: number = 10
  private bottom: number = 10
  private render() {
    return (
      <div class={style.box}>
        <div class="block">
          <a-checkbox onChange={this.onChange}>Checkbox</a-checkbox>
        </div>
        <div class="block">
          <a-checkbox-group>
            <a-checkbox value="A">A</a-checkbox>
            <a-checkbox value="B">B</a-checkbox>
            <a-checkbox value="C">C</a-checkbox>
            <a-checkbox value="D">D</a-checkbox>
            <a-checkbox value="E">E</a-checkbox>
          </a-checkbox-group>
        </div>
      </div>
    )
  }
  private onChange(e: any) {
    console.log(`checked = ${e.target.checked}`)
  }
}

export default DividerDemo
