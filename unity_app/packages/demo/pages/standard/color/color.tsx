import { Component, Vue } from 'vue-property-decorator'
import style from './index.module.less'
import { CreateElement } from 'vue'
import classnames from 'classnames'

const list = [
  {
    name: '主色',
    color: '#F56515',
    var: '@primary-color',
    class: 'primaryColor',
    less: 'background-color: @primary-color;',
  },
  {
    name: '主色2',
    color: '#FF5938-#FF8626',
    var: '@primary-color2',
    class: 'primaryColor2',
    less: 'background-image: @primary-color2;',
  },
  // border-color
  {
    name: '边框色',
    color: '#ccc',
    var: '@border-color',
    class: 'borderColor',
    less: 'border: 1px solid @border-color;',
  },
  {
    name: '成功色',
    color: '#55C059',
    var: '@success-color',
    class: 'successColor',
    less: 'background-color: @success-color;',
  },
  {
    name: '失败色',
    color: '#FF3232',
    var: '@fail-color',
    class: 'failColor',
    less: 'background-color: @fail-color;',
  },
  {
    name: '警告色',
    color: '#EF9817',
    var: '@warn-color',
    class: 'warnColor',
    less: 'background-color: @warn-color;',
  },
  {
    name: '链接色',
    color: '#5ca3e8',
    var: '@link-color',
    class: 'linkColor',
    less: 'color: @link-color;',
  },
]


@Component({})
export default class BaseUse extends Vue {

  handleClick(item: { color: string, class: string, var: string }) {
    const input = this.$refs.input as HTMLInputElement
    input.value = item.var
    input.select()
    document.execCommand('Copy')

    this.$message.info(`复制 ${item.var} 成功`)
  }
  public render(h: CreateElement) {
    const listNodes = list.map(item => {
      return (
        <div class={classnames(style.item, style[item.class])} onClick={() => this.handleClick(item)}>
          <div class={style.name}>{item.name}</div>
          <div><span class={style.label}>色码:</span>{item.color}</div>
          <div><span class={style.label}>颜色变量:</span>{item.var}</div>
          <div><span class={style.label}>less中使用:</span>{item.less}</div>
        </div>)
    })
    return (
      <div class={style.box}>
        <div class='title-bar'>颜色规范</div>
        <div style='position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;'>
          <textarea ref='input'></textarea>
        </div>
        <div style={{ marginTop: '10px' }}>
          {listNodes}
        </div>

      </div >
    )
  }
}
