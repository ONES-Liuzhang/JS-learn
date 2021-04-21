import { generateUUID } from '@/app/libs/util'

import { collectRouteConfigs } from '@/app/libs/route'

const component = () => import( /* webpackChunkName: "demo/layout" */ './layout')

export const route: RouteConfig = {
  path: 'demo',
  component,
  name: generateUUID(),
  meta: { key: '' },
}

export const children = route.children = collectRouteConfigs(
  require.context('../pages', true, /^\.\/([a-zA-Z-]+)\/index.ts$/)
)


export const componentChildren = collectRouteConfigs(
  require.context('@/app/components', true, /^\.\/([a-zA-Z-/]+)\/demo\/index.ts$/),
  'rg'
)
children.push(...componentChildren)


console.log('demo 路由配置', route);
