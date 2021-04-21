import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
@Component
class AutoCompleteDemo extends Vue {
  private dataSource: any[] = []
  private render() {
    return (
      <div class={style.box}>
        <div class="block">
          <a-auto-complete
            dataSource={this.dataSource}
            style="width: 200px"
            onSelect={this.onSelect}
            onSearch={this.handleSearch}
            placeholder="input here"
          />
        </div>
        <a-auto-complete
          dataSource={this.dataSource}
          style="width: 200px"
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
        >
          <a-textarea
            placeholder="input here"
            class="custom"
            style="height: 50px"
            onKeypress={this.handleKeyPress}
          />
        </a-auto-complete>
      </div>
    )
  }
  private handleSearch(value: string) {
    this.dataSource = !value ? [] : [value, value + value, value + value + value]
  }
  private onSelect(value: string) {
    console.log('onSelect', value)
  }

  private handleKeyPress(ev: any) {
    console.log('handleKeyPress', ev)
  }
}

export default AutoCompleteDemo
