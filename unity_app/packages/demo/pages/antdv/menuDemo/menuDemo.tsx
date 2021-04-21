import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './menu.module.less'
@Component
class MenuDemo extends Vue {
  private size = 'small'
  private test = 1
  private render() {
    return (
      <div class={style.box}>
        <a-menu mode="horizontal">
          <a-menu-item key="mail">
            <a-icon type="search" />
            Navigation One
          </a-menu-item>
          <a-menu-item key="app" disabled>
            <a-icon type="left" />
            Navigation Two
          </a-menu-item>
          <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper">
              <a-icon type="down" />
              Navigation Three - Submenu
            </span>
            <a-menu-item-group title="Item 1">
              <a-menu-item key="setting:1">Option 1</a-menu-item>
              <a-menu-item key="setting:2">Option 2</a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group title="Item 2">
              <a-menu-item key="setting:3">Option 3</a-menu-item>
              <a-menu-item key="setting:4">Option 4</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
          <a-menu-item key="alipay">
            <a href="https://antdv.com" target="_blank" rel="noopener noreferrer">
              Navigation Four - Link
            </a>
          </a-menu-item>
        </a-menu>
      </div>
    )
  }
}

export default MenuDemo
