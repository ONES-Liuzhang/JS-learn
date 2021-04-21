import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/modalDemo" */ './modalDemo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),
  meta: { title: 'Modal' },
}
export const routes = [route]
