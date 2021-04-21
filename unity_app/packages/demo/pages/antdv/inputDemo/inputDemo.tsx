import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './input.module.less'

let rules: RuleItem[] = [
  { required: true, message: '值不能为空' },
  {
    validator: (rules, value, cb) => {
      if (value.length > 6) {
        cb('最大长度为6位')
      } else {
        cb()
      }
    },
  }]
@Component({})
class DividerDemo extends Vue {
  private render(h: CreateElement) {
    return (
      <div class={style.box}>
        <div class="block">
          <a-input placeholder="请输入" rules={rules} field='name' onChange={(e: any) => {
            console.log(e)

          }} />

          <div style="margin:10px 0" />
          <a-textarea placeholder="Autosize height based on content lines"
            onChange={(e: any) => {
              let value = e.target.value
              console.log(value.indexOf('\n'))

              console.log((e.target.value))
            }} />
          <div style="margin: 10px 0" />
          <a-textarea
            placeholder="Autosize height with minimum and maximum number of lines"
            autosize={{ minRows: 2, maxRows: 6 }}
          />
          <div style="margin: 10px 0" />
          <a-input placeholder="Basic usage" ref="userNameInput">
            <a-icon slot="prefix" type="down" />
            <a-tooltip slot="suffix" title="Extra information">
              <a-icon type="left" style="color: rgba(0,0,0,.45)" />
            </a-tooltip>
          </a-input>
        </div>
        <div class="block">
          <a-input-search
            placeholder="input search text"
            style="width: 200px"
            onSearch={this.onSearch}
          />
          <br />
          <a-input-search placeholder="input search text" onSearch={this.onSearch} enterButton />
          <br />
          <a-input-search
            placeholder="input search text"
            onSearch={this.onSearch}
            enterButton="Search"
            size="large"
          />
          <br />
          <a-input-search placeholder="input search text" onSearch={this.onSearch} size="large">
            <a-button slot="enterButton">Custom</a-button>
          </a-input-search>
        </div>
        <div class="block">
          <a-input-group compact>
            <a-input style="width: 20%" defaultValue="0571" />
            <a-input style="width: 30%" defaultValue="26888888" />
          </a-input-group>
          <br />
          <a-input-group compact>
            <a-select defaultValue="Zhejiang">
              <a-select-option value="Zhejiang">Zhejiang</a-select-option>
              <a-select-option value="Jiangsu">Jiangsu</a-select-option>
            </a-select>
            <a-input style="width: 50%" defaultValue="Xihu District, Hangzhou" />
          </a-input-group>
          <br />
          <a-input-group compact>
            <a-select defaultValue="1">
              <a-select-option value="1">Between</a-select-option>
              <a-select-option value="2">Except</a-select-option>
            </a-select>
            <a-input style=" width: 100px; text-align: center" placeholder="Minimum" />
            <a-input
              style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
              placeholder="~"
              disabled
            />
            <a-input
              style="width: 100px; text-align: center; border-left: 0"
              placeholder="Maximum"
            />
          </a-input-group>
        </div>
        <div class="block">
          <div style="margin-bottom: 16px">
            <a-input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
          </div>
          <div>
            <a-input defaultValue="mysite">
              <a-select slot="addonBefore" defaultValue="Http://" style="width: 100px">
                <a-select-option value="Http://">Http://</a-select-option>
                <a-select-option value="Https://">Https://</a-select-option>
              </a-select>
              <a-select slot="addonAfter" defaultValue=".com" style="width: 80px">
                <a-select-option value=".com">.com</a-select-option>
                <a-select-option value=".jp">.jp</a-select-option>
                <a-select-option value=".cn">.cn</a-select-option>
                <a-select-option value=".org">.org</a-select-option>
              </a-select>
            </a-input>
          </div>
        </div>
      </div>
    )
  }
  private onSearch(value: string) {
    console.log(value)
  }
}

export default DividerDemo
