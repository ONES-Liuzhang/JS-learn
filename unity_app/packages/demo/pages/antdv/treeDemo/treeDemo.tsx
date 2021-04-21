import { Component, Vue, Emit, Model } from 'vue-property-decorator'
import style from './tabs.module.less'


const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
]
@Component
class TreeDemo extends Vue {
  // @Model('change', { type: [], default: () => [] }) public checkedKeys!: () => []
  private checkedKeys = ['0-0-0']

  private expandedKeys = ['0-0-0', '0-0-1']

  private autoExpandParent = true
  private selectedKeys = []
  private treeData = treeData;
  private onExpand(expandedKeys: any) {
    console.log('onExpand', expandedKeys)
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.expandedKeys = expandedKeys
    this.autoExpandParent = false
  }

  private onCheck(checkedKeys: any) {
    console.log('onCheck', checkedKeys)
    this.checkedKeys = checkedKeys
  }
  private onSelect(selectedKeys: any, info: any) {
    console.log('onSelect', info)
    this.selectedKeys = selectedKeys
  }
  private changeValue(keys: string[]) {
    console.log(keys)
    this.checkedKeys = keys
  }
  public render() {
    return (
      <div class={style.box}>
        <a-tree
          checkable
          onExpand={this.onExpand}
          expandedKeys={this.expandedKeys}
          autoExpandParent={this.autoExpandParent}
          // v-model={this.checkedKeys}
          value={this.checkedKeys}
          // onChange={(value: string[]) => "$emit('change-value', $event.target.value)"}
          onSelect={this.onSelect}
          slectedKeys={this.selectedKeys}
          treeData={this.treeData}
        />
      </div>
    )
  }
  private onChange(e: any) {
    console.log(e)
  }
}
export default TreeDemo
