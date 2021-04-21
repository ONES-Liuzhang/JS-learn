import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import RgInput from '@/app/components/input/rg-input'
import RgForm from '@/app/components/form/rg-form'

@Component({})
export default class InputDemo extends Vue {
  private value = ''
  private value1 = ''

  private created() {
  }

  public render(h: CreateElement) {
    return (<div class={style.box} >
      <div class='block'>
        <RgForm>
          <RgInput vModel={this.value}
            onChange={(e: Event) => {
              // console.log(e.target.value)
            }}
            onKeyup={(e: KeyboardEvent) => {
              if (e.key === 'Enter') console.log(e)
            }}
          ></RgInput>

        </RgForm>
      </div>
    </div >)
  }
}
