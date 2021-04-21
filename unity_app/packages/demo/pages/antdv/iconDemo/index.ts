import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "demo/iconDemo" */ './iconDemo')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),
  component,
  meta: { title: 'Icon' },
}
export const routes = [route]
