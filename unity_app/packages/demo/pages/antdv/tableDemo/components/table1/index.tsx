/* eslint-disable no-nested-ternary */
/* eslint-disable no-script-url */
import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'nameTitle' },
    width: 100,
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    width: 100,
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

@Component
class TableDemo extends Vue {
  private data = data
  //   private pagination = {}
  private columns = columns

  private render() {
    const scopedSlot = {
      name: (text: string) => {
        return <a>{text}</a>
      },
      tags: (tags: string[]) => {
        return tags.map((tag) => (
          <a-button
            block={true}
            // eslint-disable-next-line no-nested-ternary
            color={tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'}
            key={tag}
          >
            {tag.toUpperCase()}
          </a-button>
        ))
      },
      action: (record: { name: string }) => {
        return (
          <span slot-scope="text, record">
            <a href="javascript:;">Invite 一 {record.name}</a>
            <a-divider type="vertical" />
            <a href="javascript:;">Delete</a>
            <a-divider type="vertical" />
            <a href="javascript:;" class="ant-dropdown-link">
              More actions <a-icon type="down" />
            </a>
          </span>
        )
      },
      operation: (value: string, record: { key: string }) => {
        return (
          <a-button
            type="danger"
            onClick={() => {
              const { key } = record
              this.data = this.data.filter((item) => {
                return item.key !== key
              })
              console.log(record)
            }}
          >
            删除
          </a-button>
        )
      },
    }
    return (
      <div class={style.box}>
        <div class="block">
          <a-table
            bordered={true}
            columns={this.columns}
            dataSource={this.data}
            scopedSlots={scopedSlot}
          >
            <span slot="nameTitle">
              <span>姓名</span>
              <a-icon type="search" />
            </span>
            <h3 slot="title">
              <a-button
                onClick={() => {
                  this.data.push({
                    // tslint:disable-next-line: prefer-template
                    key: this.data.length + 1 + '',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York Lake Park',
                    tags: ['nice'],
                  })
                }}
              >
                添加
              </a-button>
            </h3>
            <div slot="footer">表尾</div>
          </a-table>
        </div>
      </div>
    )
  }
}

export default TableDemo
