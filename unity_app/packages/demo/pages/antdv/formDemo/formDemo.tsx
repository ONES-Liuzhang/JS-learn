import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'

// 
const ruleMap: { [key: string]: RuleItem[] } = {
  name: [
    { required: true, message: '值不能为空' },
    {
      validator: (rules, value, cb) => {
        if (value.length > 6) {
          cb('最大长度为6位')
        } else {
          cb()
        }
      },
    },
  ],

  abc: [
    { required: true, message: '值不能为空' },
    {
      validator: (rules, val, cb) => {
        if (val === 'jack') {
          cb('选择错误')
        } else {
          cb()
        }
      },
    },
  ],
  multiple: [
    { required: true, message: '值不能为空' },
  ],
}

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']

@Component({})
export default class FormDemo extends Vue {
  private name = ''
  private selectedItems: string[] = []

  private created() {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ a: 20 })
        // reject({ msg: 32 })
      }, 100)
    })
      .then(data => {
        console.log(data)
        // return Promise.reject({ xxx: 323 })
        // return { b: 30 }
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(500)
          }, 500)
        })
      })
      .then(data => {
        debugger
        return data
      })
      .finally(() => {
        return { c: 323 }
      })
      .then(data => {
        return { update: 323 }
      })
      .then(data => {
        debugger
      })
      .catch(err => {
        console.log(err)
        return { msg: 323 }
      })
      .catch(err => {
        console.log(err)
        return { msg: 333 }
      })
  }


  get filteredOptions() {
    return OPTIONS.filter(o => !this.selectedItems.includes(o))
  }
  public render(h: CreateElement) {
    return (
      <div class={style.box}>
        <div class='block'>
          <a-form ref='form' labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} >
            <a-form-item label="名称">
              <a-input
                vModel={this.name}
                rules={ruleMap.name}
              />
              <a-select style="width: 120px"
                filterOption={this.filterOption}
                rules={ruleMap.abc}
                defaultValue='jack'
                k='agc'
                placeholder='请选择'>
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
            </a-form-item >
            <a-form-item label="电话号码">
              <a-input
                vModel={this.name}
                k='phone'
                rules={ruleMap.name}
              />
            </a-form-item>
            <a-form-item label="多选">
              <a-select
                mode="multiple"
                placeholder="Inserted are removed"
                value={this.selectedItems}
                rules={ruleMap.name}
                onChange={(selectedItems: any) => (this.selectedItems = selectedItems)}
                style="width: 100%"
              >
                {
                  this.filteredOptions.map(item => <a-select-option key={item} value={item}>
                    {item}
                  </a-select-option>)
                }
              </a-select>
            </a-form-item>
          </a-form>
          <a-button onClick={() => {
            let form = this.$refs.form as any
            form.validate()
          }}>验证</a-button>
          <a-tooltip trigger='click' title='testtestsetst'>
            <a-button>
              ToolTip
            </a-button>
          </a-tooltip>

        </div >
      </div >
    )
  }
}
