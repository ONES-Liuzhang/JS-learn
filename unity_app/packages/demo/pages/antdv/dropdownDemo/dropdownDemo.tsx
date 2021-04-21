import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './dropdownDemo.module.less'
@Component
class DropdownDemo extends Vue {
  private top: number = 10
  private bottom: number = 10
  private render() {
    return (
      <div class={style.box}>
        {/* <div class="block">
          <a-dropdown>
            <a class="ant-dropdown-link" href="#">
              Hover me <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="#">1st menu item</a>
              </a-menu-item>
              <a-menu-item>
                <a href="#">2nd menu item</a>
              </a-menu-item>
              <a-menu-item>
                <a href="#">3rd menu item</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="block">
          <a-dropdown trigger={['contextmenu']}>
            <span style="user-select: none">右击弹出</span>
            <a-menu slot="overlay">
              <a-menu-item key="1">1st menu item</a-menu-item>
              <a-menu-item key="2">2nd menu item</a-menu-item>
              <a-menu-item key="3">3rd menu item</a-menu-item>
            </a-menu>
          </a-dropdown>
        </div> */}
        <div class="block">
          {/* <a-dropdown-button>
            Dropdown
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a-icon type="left" />
                1st menu item
              </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="left" />
                2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                <a-icon type="left" />
                3rd item
              </a-menu-item>
            </a-menu>
          </a-dropdown-button>
          <a-dropdown-button disabled style="margin-left: 8px">
            Dropdown
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a-icon type="user" />
                1st menu item
              </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="user" />
                2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                <a-icon type="user" />
                3rd item
              </a-menu-item>
            </a-menu>
          </a-dropdown-button> */}
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a-icon type="user" />
                1st menu item
              </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="user" />
                2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                <a-icon type="user" />
                3rd item
              </a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              Button <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </div>
      </div>
    )
  }
}

export default DropdownDemo
