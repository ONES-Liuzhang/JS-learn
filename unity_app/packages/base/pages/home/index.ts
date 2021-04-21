import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "home" */ './home')
import router from '@/app/router'
export const route: RouteConfig = {
  path: '',
  name: generateUUID(),
  component,
  meta: {
    topMenuKey: 'home', // 顶部菜单高亮的key
    key: 'home',
  },
}

export const go = () => {
  router.push({ name: route.name })
}
export const routes = [route]
