import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
const rules: RuleItem[] = [
  { required: true },
  {
    validator: (rules, val, cb) => {
      if (val === 'jack') {
        cb('选择错误')
      } else {
        cb()
      }
    },
  },
]
@Component({})
class SelectDemo extends Vue {
  private render() {
    let optionsNode = []
    for (let i = 0; i < 25; i++) {
      let key = (i + 9).toString(36) + i
      optionsNode.push(<a-select-option key={key}
      >{key}</a-select-option>)
    }
    return (
      <div class={style.box}>
        <div class='block'>
          <a-select style="width: 120px"
            filterOption={this.filterOption}
            onChange={this.handleChange}
            rules={rules}
            placeholder='请选择'>
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>

          </a-select>

          <a-select style="width: 120px"
            onChange={this.handleChange}
            placeholder='请选择' disabled>
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>


          <a-select
            mode="tags"
            style="width: 120px"
            // mode="multiple"
            allowClear={true}
            defaultValue={['a1', 'b2']}
            onChange={this.handleChange}
            placeholder="Please select"

          >{optionsNode}</a-select>

          <a-select
            mode="tags"
            defaultValue="lucy"
            style="width: 200px"
            {...{ props: { filterOption: this.filterOption } }}
          // filterOption={this.filterOption}
          >
            <a-select-opt-group>
              <span slot="label"><a-icon type='down' />Manager</span>
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
            </a-select-opt-group>
            <a-select-opt-group label="Engineer">
              <a-select-option value="Yiminghe">yiminghe</a-select-option>
            </a-select-opt-group>
          </a-select>
          {/* <a-select
            style="width: 100%"
            mode="multiple"
            block={true}
            // showArrow={true}
            // allowClear={true}
            defaultValue={['a1', 'b2']}
            onChange={this.handleChange}
            placeholder="Please select"
          >{optionsNode}</a-select> */}
        </div >
      </div >
    )
  }
  private filterOption(input: string, option: { componentOptions: { children: { text: string }[] } }) {
    return (
      option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    )
  }
  private handleChange(value: string) {
    console.log(value)

  }
}

export default SelectDemo
