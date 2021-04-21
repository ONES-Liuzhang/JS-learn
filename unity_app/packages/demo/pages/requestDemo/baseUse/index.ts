import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "demo/request/baseUse" */ './baseUse')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),

  meta: { title: '基本用法' },
}
export const routes = [route]
