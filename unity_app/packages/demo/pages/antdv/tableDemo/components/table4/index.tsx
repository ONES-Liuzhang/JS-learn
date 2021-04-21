import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'

interface IRecord {
  key: string
  name: string
  age: number
  phone: string
  editable: boolean
}
const columns = [
  {
    title: '姓名',
    width: '10%',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '年龄',
    width: '2%',
    dataIndex: 'age',
  },
  {
    title: '电话',
    width: '20%',
    dataIndex: 'phone',
  },
  {
    title: '操作',
    width: '20%',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
]
const data: IRecord[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i + 1}`,
    age: (i * 2) % 15,
    phone: '32422342342',
    editable: false,
    // address: `London Park no. ${i}`,
  })
}
@Component
class Table4 extends Vue {
  private columns = columns
  private data = data
  handleChange(value: string | number, key: string, column: keyof IRecord) {
    const newData = [...this.data]
    const target = newData.filter((item) => key === item.key)[0] as IRecord | null
    if (target) (target[column] as string | number) = value
  }
  editHandler(key: string) {
    const target = this.data.find((item) => key === item.key)
    if (target) {
      target.editable = true
    }
  }
  saveHandler(key: string) {
    const target = this.data.find((item) => key === item.key)
    if (target) {
      target.editable = false
    }
  }
  cancelHandler(key: string) {
    const target = this.data.find((item) => key === item.key)
    if (target) {
      target.editable = false
    }
  }
  private render() {
    const scopedSlots = {
      name: (value: string, record: IRecord, index: number) => {
        if (record.editable) {
          return (
            <a-input
              style="margin: -5px 0"
              value={value}
              onChange={(e: any) => {
                this.handleChange(e.target.value, record.key, 'name')
              }}
            />
          )
        }
        return <div>{value}</div>
      },
      operation: (value: string, record: IRecord) => {
        if (record.editable) {
          return (
            <div>
              <a onClick={() => this.saveHandler(record.key)}>保存</a>
              <a onClick={() => this.cancelHandler(record.key)}>取消</a>
            </div>
          )
        }
        return <a-button onClick={() => this.editHandler(record.key)}>编辑</a-button>
      },
    }
    return (
      <div class={style.box}>
        <div class="block">
          <a-table
            bordered
            columns={this.columns}
            dataSource={this.data}
            onChange={this.handleChange}
            scopedSlots={scopedSlots}
          />
        </div>
      </div>
    )
  }
}

export default Table4
