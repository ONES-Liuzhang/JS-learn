// export { default as store } from './store'

import { routes as baseRoutes } from '@/base'

import { routes as spfRoutes } from '@/spf'

import { routes as userRoutes } from '@/user'

import { routes as demoRoutes } from '@/demo'


const component = () => import( /* webpackChunkName: "app/layout" */ './layout')

export const route: RouteConfig = {
  path: '/',
  component,
  redirect: '/base/home',
  meta: { key: 'layout' },
  children: [
    ...userRoutes,
    ...baseRoutes,
    ...spfRoutes,
    ...demoRoutes,
  ],
}


// 路由列表
export const routes: RouteConfig[] = [route]
