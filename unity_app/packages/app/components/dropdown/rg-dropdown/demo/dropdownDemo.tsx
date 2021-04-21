import { Component, Vue } from 'vue-property-decorator'
import style from './index.module.less'
import { RgDropdown, RgDropdownButton } from '../index'
import RgIcon from '@/app/components/icon/rg-icon'

@Component
export default class CheckBoxDemo extends Vue {
  private created() { }

  public render(h: CreateElement) {
    return (
      <div class={style.box}>
        {/* <div class="block">
          <RgDropdown>
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
          </RgDropdown>
        </div>
        <div class="block">
          <RgDropdown trigger={['contextmenu']}>
            <span style="user-select: none">右击弹出</span>
            <a-menu slot="overlay">
              <a-menu-item key="1">1st menu item</a-menu-item>
              <a-menu-item key="2">2nd menu item</a-menu-item>
              <a-menu-item key="3">3rd menu item</a-menu-item>
            </a-menu>
          </RgDropdown>
        </div> */}
        <div class="block">
          {/* <RgDropdownButton>
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
          </RgDropdownButton> */}
          {/* <RgDropdownButton disabled style="margin-left: 8px">
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
          </RgDropdownButton> */}
          <RgDropdown>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <RgIcon type="telephone" />
                1st menu item
              </a-menu-item>
              <a-menu-item key="2">
                <RgIcon type="telephone" />
                2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                <RgIcon type="telephone" />
                3rd item
              </a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              Button <RgIcon type="down" />
            </a-button>
          </RgDropdown>
        </div>
      </div>)
  }
}
