import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'

const renderContent = (value: any, row: {}, index: number) => {
  const obj = {
    children: value,
    attrs: {},
  }
  if (index === 4) {
    obj.attrs = { colSpan: 0 }
  }
  return obj
}
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    customRender: (value: string, row: {}, index: number) => {
      if (index < 4) {
        return {
          children: value,
          attrs: {},
        }
      }
      return {
        children: value,
        // children: <a href="javascript:;">{text}</a>,
        attrs: { colSpan: 5 },
      }
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    customRender: renderContent,
  },
  {
    title: 'Home phone',
    colSpan: 2,
    dataIndex: 'tel',
    customRender: (value: any, row: {}, index: number) => {
      const obj = {
        children: value,
        attrs: {},
      }
      if (index === 1) obj.attrs = { rowSpan: 3 }
      if (index === 2) obj.attrs = { rowSpan: 0 }
      if (index === 3) obj.attrs = { rowSpan: 0 }
      if (index === 4) obj.attrs = { rowSpan: 0 }
      return obj
    },
  },
  {
    // title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
    customRender: renderContent,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    customRender: renderContent,
  },
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  },
]

@Component
class Table2 extends Vue {
  private data = data
  //   private pagination = {}
  private columns: {}[] = columns
  private render() {
    return (
      <div class={style.box}>
        <div class="block">
          <a-table columns={this.columns} dataSource={this.data} bordered>
            {/* <template slot="name" slot-scope="text">
              <a href="javascript:;">{{ text }}</a>
            </template> */}
          </a-table>
        </div>
      </div>
    )
  }
}

export default Table2
