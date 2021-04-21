import { generateUUID } from '@/app/libs/util'


const component = () => import( /* webpackChunkName: "demo/menu" */ './menuDemo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),

  meta: { title: 'Menu' },
}
export const routes = [route]
