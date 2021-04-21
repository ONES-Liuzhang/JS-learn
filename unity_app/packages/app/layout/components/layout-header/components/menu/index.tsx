import { Component, Vue } from 'vue-property-decorator'
import style from './menu.module.less'
import { state } from '@/app/layout/store'
import { mMenus as sfpMenus } from '@/spf'
import { mMenus as demoMenus } from '@/demo'

const menuList = [
  // {
  //   title: '客户',
  //   key: 'custom',
  //   onClick: () => router.push({ name: homeRoute.name }),
  // },
  ...sfpMenus,
  ...demoMenus,
  // {
  //   title: '团队',
  //   key: 'team',
  //   onClick: () => router.push({ name: memberRoute.name }),
  // },
  // {
  //   title: 'TIMP',
  //   key: 'timp',
  //   onClick: () => router.push({ name: memberRoute.name }),
  // },
  // {
  //   title: '经分',
  //   key: 'analysis',
  //   onClick: () => router.push({ name: memberRoute.name }),
  // },
  // {
  //   title: '资讯',
  //   key: 'info',
  //   onClick: () => router.push({ name: memberRoute.name }),
  // },
]

@Component({})
export default class HeaderDown extends Vue {
  private menus = menuList.slice()
  private renderMenus(h: CreateElement) {

    return this.menus.map((menu: any) => {
      return <div class={style.item}>
        <div class={[{ [style.active]: state.menuKey === menu.key }, menu.class]}
          onClick={menu.onClick} >
          {typeof (menu.title) === 'function' ? menu.title(h) : menu.title}
        </div>
      </div>
    })
  }
  private render(h: CreateElement) {
    return (
      <div class={style.box}>{this.renderMenus(h)}</div>
    )
  }
}
