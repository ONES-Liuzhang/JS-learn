import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/inputDemo" */ './inputDemo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),

  // meta: { title: '基础使用' },
}
export const routes = [route]
