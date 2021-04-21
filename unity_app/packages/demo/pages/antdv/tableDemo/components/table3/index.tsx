import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
]
@Component
class Table3 extends Vue {
  // tslint:disable-next-line: no-null-keyword
  private filteredInfo: { name?: string[] } | null = null
  // tslint:disable-next-line: no-null-keyword
  private sortedInfo: { columnKey?: string; order?: string } | null = null
  private data = data

  get columns() {
    // tslint:disable-next-line: no-this-assignment
    let { sortedInfo, filteredInfo } = this
    sortedInfo = sortedInfo || {}
    filteredInfo = filteredInfo || {}
    console.log('columns')
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
          {
            text: 'Submenu',
            value: 'Submenu',
            children: [
              { text: 'Green', value: 'Green' },
              { text: 'Black', value: 'Black' },
            ],
          },
        ],
        // tslint:disable-next-line: no-null-keyword
        filteredValue: filteredInfo.name || null,
        onFilter: (value: string, record: { name: string }) => {
          return record.name.indexOf(value) === 0
        },
        sorter: (a: { name: string }, b: { name: string }) => {
          return a.name.length - b.name.length
        },
        sortDirections: ['descend', 'ascend'],
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        // sorter: (a: { age: number }, b: { age: number }) => a.age - b.age,
        // sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        // filters: [
        //   { text: 'London', value: 'London' },
        //   { text: 'New York', value: 'New York' },
        // ],
        // filteredValue: filteredInfo.address || null,
        // onFilter: (value: any, record: { address: string | any[] }) =>
        //   record.address.includes(value),
        // sorter: (a: { address: string | any[] }, b: { address: string | any[] }) =>
        //   a.address.length - b.address.length,
        // sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      },
    ]
    return columns
  }

  handleChange(
    pagination: {},
    filters: any,
    sorter: { columnKey?: string | undefined; order?: string | undefined } | null
  ) {
    console.log('Various parameters', sorter)
    this.filteredInfo = filters
    this.sortedInfo = sorter
  }
  clearFilters() {
    // tslint:disable-next-line: no-null-keyword
    this.filteredInfo = null
  }
  clearAll() {
    // tslint:disable-next-line: no-null-keyword
    this.filteredInfo = null
    // tslint:disable-next-line: no-null-keyword
    this.sortedInfo = null
  }
  setAgeSort() {
    this.sortedInfo = {
      order: 'descend',
      columnKey: 'age',
    }
  }
  private render() {
    console.log('render')

    return (
      <div class={style.box}>
        <div class="block">
          <div class="table-operations">
            <a-button onClick={this.setAgeSort}>排序age</a-button>
            <a-button onClick={this.clearFilters}>清除筛选</a-button>
            <a-button onClick={this.clearAll}>Clear filters and sorters</a-button>
          </div>
          <a-table
            pagination={false}
            columns={this.columns}
            dataSource={this.data}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}

export default Table3
