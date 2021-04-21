import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import RgInput from '@/app/components/input/rg-input'

const test = { test: 'test' }
@Component({})
export default class InputDemo extends Vue {
  private x = Object.create(test)
  private value = '3242'
  private value1 = ''
  private created() {

  }
  public render(h: CreateElement) {
    return (<div class={style.box} >
      <div class='block'>
        <div>
          有vModel
          <RgInput
            vModel={this.value}
            // disabled={false}
            rules={[{ required: true }]}
            onChange={(e: Event) => {
              // console.log(e.target.value)
            }}
            onKeyup={(e: KeyboardEvent) => {
              if (e.key === 'Enter') console.log(e)
            }}
          ></RgInput>

        </div>
        <div>
          没有vModel
          <RgInput defaultValue='324242' ref='input2' ></RgInput>

        </div>
      </div>

      {/* <div class='block'>
        <a-input vModel={this.value1}></a-input>
      </div> */}
    </div >)
  }
}
