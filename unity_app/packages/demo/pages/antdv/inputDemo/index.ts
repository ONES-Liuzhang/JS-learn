import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "demo/inputDemo" */ './inputDemo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),

  meta: { title: 'Input' },
}
export const routes = [route]
