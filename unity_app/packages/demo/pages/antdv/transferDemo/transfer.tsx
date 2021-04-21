import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'

const mockData: { key: string; title: string; description: string; disabled: boolean }[] = []
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  })
}

const oriTargetKeys = mockData.filter(item => Number(item.key) % 3 > 1).map(item => item.key)
@Component
class TransferDemo extends Vue {
  private mockData = mockData
  private targetKeys = oriTargetKeys
  private selectedKeys = ['1', '4']
  private disabled = false

  handleChange(nextTargetKeys: string[], direction: any, moveKeys: any) {
    this.targetKeys = nextTargetKeys

    console.log('targetKeys: ', nextTargetKeys)
    console.log('direction: ', direction)
    console.log('moveKeys: ', moveKeys)
  }
  handleSelectChange(sourceSelectedKeys: any, targetSelectedKeys: any) {
    this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys]

    console.log('sourceSelectedKeys: ', sourceSelectedKeys)
    console.log('targetSelectedKeys: ', targetSelectedKeys)
  }
  handleScroll(direction: any, e: { target: any }) {
    console.log('direction:', direction)
    console.log('target:', e.target)
  }
  handleDisable(disabled: boolean) {
    this.disabled = disabled
  }
  private render() {
    return (
      <div class={style.box}>
        <a-transfer
          dataSource={this.mockData}
          titles={['Source', 'Target']}
          targetKeys={this.targetKeys}
          selectedKeys={this.selectedKeys}
          onChange={this.handleChange}
          onselectChange={this.handleSelectChange}
          onscroll={this.handleScroll}
          render={(item: { title: any }) => item.title}
          disabled={this.disabled}
        />
        <a-switch
          unCheckedChildren="enabled"
          checkedChildren={this.disabled}
          checked={this.disabled}
          onChange={this.handleDisable}
          style="margin-top: 16px"
        />

      </div>
    )
  }
}

export default TransferDemo
