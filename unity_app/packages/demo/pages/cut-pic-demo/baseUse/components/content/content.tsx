/* eslint-disable no-nested-ternary */
/* eslint-disable no-script-url */
/*
 * html2canvas
 * 链接 https://html2canvas.hertzen.com/getting-started
 */

import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import html2canvas from 'html2canvas'
import { CreateElement } from 'vue'

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
  {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

@Component({})
export default class Content extends Vue {
  private data = data
  //   private pagination = {}
  private columns = columns

  private loading = false
  public render(h: CreateElement) {
    const scopedSlot = {
      name: (text: string) => {
        return <a>{text}</a>
      },
      tags: (tags: string[]) => {
        return tags.map((tag) => (
          <a-button
            block={true}
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
              this.data = this.data.filter((item: { key: string }) => {
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
        <div class={style.item} >
          <div ref="cut" class={style.cut}>
            <div>
              <a-table
                bordered={true}
                columns={this.columns}
                dataSource={this.data}
                scopedSlots={scopedSlot}
              >
                <span slot="nameTitle">
                  <span>姓名</span>
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
            <div>
              <a-button type="danger">按钮</a-button>
              <a-form style={{ width: '50%' }}>
                <a-form-item
                  label-col={this.labelCol}
                  wrapper-col={this.wrapperCol}
                  label="统一社会信用代码"
                >
                  <a-input id="1" placeholder="请输入18位统一社会信用代码" />
                </a-form-item>

                <a-form-item
                  label-col={this.labelCol}
                  wrapper-col={this.wrapperCol}
                  label="公司名称"
                >
                  <a-input id="2" />
                </a-form-item>
                <a-form style={{ width: '50%' }}>
                  <a-form-item
                    label-col={this.labelCol}
                    wrapper-col={this.wrapperCol}
                    label="test"
                    validate-status="error"
                    help="Should be combination of numbealphabets"
                  >
                    <a-input id="error" placeholder="unavailable choice" />
                  </a-form-item>
                </a-form >
                <div>
                  <a-icon style={{ 'font-size': '70px' }} component={require('svg/todo/pass.svg').default} />
                  <a-icon style={{ 'font-size': '70px' }} component={require('svg/todo/nopass.svg').default} />
                </div>
                <div class={style.yz}>
                  <img src={require('../../images/yz.jpg')} alt="" />
                </div>
              </a-form >
            </div>

          </div>
        </div>
      </div >
    )
  }
  private handleReqest() { }
}
