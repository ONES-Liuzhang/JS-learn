import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "demo/dropdownDemo" */ './dropdownDemo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),
  meta: { title: 'Dropdown' },
}
export const routes = [route]
