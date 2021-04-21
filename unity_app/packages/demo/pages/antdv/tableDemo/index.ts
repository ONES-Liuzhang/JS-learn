import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/tableDemo" */ './tableDemo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),

  meta: { title: 'Table' },
}
export const routes = [route]
