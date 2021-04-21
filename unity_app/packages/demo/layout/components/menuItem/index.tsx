import style from './index.module.less'
import { IDemoMenu } from '../aside/aside'
import router from '@/app/router'
// tslint:disable-next-line: variable-name
const MenuItem = {
  functional: true,
  render(h: CreateElement, context: { props: { menu: IDemoMenu } }) {

    const { menu } = context.props
    const { children, title, path, route } = menu as any
    if (!children) {
      return (
        <a-menu-item key={path}
          onClick={() => router.push({ name: route!.name as string })}
        >
          <a-icon type="search" />
          <span>{title}</span>
        </a-menu-item>
      )
    }

    return (
      <a-sub-menu key={path}>
        <span slot="title">
          <a-icon type="search" />
          <span>{title}</span>
        </span>
        {children.map((subMenu: any) => {
          return h(MenuItem, { props: { menu: subMenu } })
        })}
      </a-sub-menu>
    )
  },
}
export default MenuItem
