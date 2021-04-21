import { Component, Vue, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import RgPaSelect from '@/app/components/select/rg-pa-select'


const list: any[] = []
for (let i = 0; i < 10; i++) {
  list.push({ key: `a${i}`, value: `a${i}` })
}

const list2: any[] = [
  { key: '23', value: '324242' },
  { key: '323', value: 'dfafgew' },
  {
    key: '23243',
    value: '32dlssa',
    scopedSlot: { name: 'rogen' }
  },
]
@Component({})
export default class PicUploadDemo extends Vue {
  private value = 'a11'

  handlerValueChange(val: string, item: any) {
    console.log(val, item)

  }
  private handlerReset() {
    this.value = ''
  }
  private render(h: CreateElement) {
    const scopedSlots = {
      rogen: () => {
        return <div>
          <span>3242</span>
          <a-input></a-input>
        </div>
      }
    }
    return <div class={style.box}>
      <div class='block'>
        <div >
          <div class='df'>
            <div class='f1 '>
              <div class='df'>
                <div style={{ width: '100px' }}>标签1</div>
                <div class='f1'>
                  <RgPaSelect list={list}
                    vModel={this.value}
                    onChange={this.handlerValueChange}
                  ></RgPaSelect>
                </div>
              </div>
            </div>
            <div class='f1 df '>
              <div style={{ width: '100px' }}>标签2</div>
              <div class='f1'>
                <RgPaSelect list={list2}
                  vModel={this.value}
                  onChange={this.handlerValueChange}
                  scopedSlots={scopedSlots}
                ></RgPaSelect>
              </div>
            </div>
          </div>
        </div>
        <a-button onClick={this.handlerReset}>重置 </a-button>


      </div>
    </div>
  }
}
