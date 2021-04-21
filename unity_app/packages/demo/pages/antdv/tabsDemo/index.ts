import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/pagination" */ './tabsDemo')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),

  component,
  meta: { title: 'Tabs' },
}
export const routes = [route]
