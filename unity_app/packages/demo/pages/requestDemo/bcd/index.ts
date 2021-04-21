import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/test_abc" */ './abc')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),

  component,
  meta: {},
}
export const routes = [route]
