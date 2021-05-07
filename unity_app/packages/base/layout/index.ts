import { generateUUID } from '@/app/libs/util'
import { collectRouteConfigs } from '@/app/libs/route'

const component = () => import( /* webpackChunkName: "base/layout" */ './layout')

export const route: RouteConfig = {
  path: 'base',
  name: generateUUID(),
  component,
  meta: {},
}


export const children: RouteConfig[] = route.children = collectRouteConfigs(
  require.context('../pages', true, /^\.\/([a-zA-Z-]+)\/index.ts$/)
)


console.log('基础模块路由', route);