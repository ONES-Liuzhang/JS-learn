import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/spinDemo" */ './spinDemo')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),

  component,
  meta: { title: 'Spin' },
}
export const routes = [route]
