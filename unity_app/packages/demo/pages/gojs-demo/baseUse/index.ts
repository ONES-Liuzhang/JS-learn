import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "demo/gojs_abc" */ './baseUse')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),
  component,
  meta: {},
}


export const routes = [route]
