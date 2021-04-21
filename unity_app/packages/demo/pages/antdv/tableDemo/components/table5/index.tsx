import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'

interface IRecord {
  key: number
  name: string
  age: number
  street: string
  building: string
  companyAddress: string
  companyName: string
  number: number
  gender: string
}

const data: IRecord[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  })
}

const columns = [
  {
    title: '姓名',
    width: 200,
    dataIndex: 'name',
    fixed: 'left',
  },
  {
    title: '其他',
    children: [
      {
        title: '年龄',
        width: 100,
        dataIndex: 'age',
      },
      {
        title: '地址',
        children: [
          {
            title: '街道',
            dataIndex: 'street',
          },
          {
            title: '街区',
            children: [
              {
                title: '建筑',
                dataIndex: 'building',
              },
              {
                title: '门牌号',
                width: 100,
                dataIndex: 'number',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: '公司',
    children: [
      {
        title: '公司地址',
        dataIndex: 'companyAddress',
      },
      {
        title: '公司名称',
        dataIndex: 'companyName',
      },
    ],
  },
  {
    title: '性别',
    width: 100,
    dataIndex: 'gender',
    fixed: 'right',
  },
]
@Component
class Table5 extends Vue {
  private columns = columns
  private data = data
  private render() {
    return (
      <div class={style.box}>
        <div class="block">
          <a-table
            bordered
            columns={this.columns}
            dataSource={this.data}
            // scroll={true}
            scroll={{ x: '110%' }}
            // onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}

export default Table5
