import { Component, Vue } from 'vue-property-decorator'
import style from './index.module.less'
import { children as mainChildren } from '@/demo/layout'
import { RouteConfig } from 'vue-router'
import MenuItem from '../menuItem'
export interface IDemoMenu {
  path: string
  title?: string
  // tslint:disable-next-line: typedef-whitespace
  route?: RouteConfig
  // tslint:disable-next-line: typedef-whitespace
  children?: IDemoMenu[]
}
const menuMap: { [key: string]: IDemoMenu } = {}
const allMenuMap: { [key: string]: IDemoMenu } = {}

mainChildren.forEach(route => {
  const { path } = route
  const list = path.split('/')
  if (list[list.length - 1] === 'demo') list.pop()
  const menu = {
    path,
    title: route!.meta!.title || list[list.length - 1],
    route,
  }
  abc(menu)
})

function abc(menu: IDemoMenu) {
  const { path, route } = menu
  const pathBlocks = path.split('/')
  if (pathBlocks[pathBlocks.length - 1] === 'demo') pathBlocks.pop()
  const len = pathBlocks.length
  if (len === 1) {
    menuMap[path] = menu
  } else {
    const tempPath = pathBlocks.slice(0, len - 1).join('/')
    let tempMenu: IDemoMenu = allMenuMap[tempPath]
    if (!tempMenu) {
      tempMenu = allMenuMap[tempPath] = {
        path: tempPath,
        title: pathBlocks[len - 2],
        children: [],
      }
      abc(tempMenu)
    }
    const children = tempMenu.children as IDemoMenu[]
    children.push(menu)
  }
}
const menus = Object.values(menuMap)
console.log('demo 侧边栏渲染', menuMap)

@Component({})
export default class LayoutAside extends Vue {
  private created() {
    this.__defaultKeys = this.getKeys(menus)
  }

  private getKeys(list: IDemoMenu[], keys: string[] = []): string[] {
    let path = this.$route.path
    //let target = list.find(item => path.includes(item.path))
    let target = list.find(item => new RegExp(`(^|/)${item.path}(/|$)`).test(path))
    if (!target) return keys
    keys.push(target.path)
    if (!target.children) return keys
    return this.getKeys(target.children, keys)
  }
  private render(h: CreateElement) {

    const menusItemNodes = menus.map(menu => h(MenuItem, { props: { menu } }))
    return (
      <a-menu
        onClick={this.handleClick}
        defaultSelectedKeys={this.__defaultKeys}
        defaultOpenKeys={this.__defaultKeys}
        mode="inline"
        class={[style.box, 'hideScrollBar']}
      >
        {menusItemNodes}
      </a-menu>
    )
  }
  private handleClick(e: RouteConfig) {
    // console.log('click', e)
  }
  private titleClick(item: RouteConfig) {
    this.$router.push({ name: item.name })
    // console.log('titleClick', item)
  }
}
