import { generateUUID } from '@/app/libs/util'


const component = () => import( /* webpackChunkName: "demo/checkboxDemo" */ './checkboxDemo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),
  meta: { title: 'CheckBox' },
}
export const routes = [route]
