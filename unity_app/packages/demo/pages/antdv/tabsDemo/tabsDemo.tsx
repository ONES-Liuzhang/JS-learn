import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './tabs.module.less'

@Component
class TabsDemo extends Vue {
  public render() {
    return (
      <div class={style.box}>
        <a-Tabs defaultActiveKey="1" onChange={this.onChange}>
          <a-TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </a-TabPane>
          <a-TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </a-TabPane>
          <a-TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </a-TabPane>
        </a-Tabs>
        <a-Switch defaultChecked />
      </div>
    )
  }
  private onChange(e: any) {
    console.log(e)
  }
}
export default TabsDemo
