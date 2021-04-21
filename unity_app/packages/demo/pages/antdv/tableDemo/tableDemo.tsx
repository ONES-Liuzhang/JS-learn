import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import Table1 from './components/table1'
import Table2 from './components/table2'
import Table3 from './components/table3'
import Table4 from './components/table4'
import Table5 from './components/table5'

@Component
class TableDemo extends Vue {
  private render() {
    return (
      <div class={style.box}>
        <Table5></Table5>
        <Table4></Table4>
        <Table3></Table3>
        <Table1></Table1>
        <Table2></Table2>
      </div>
    )
  }
}

export default TableDemo
