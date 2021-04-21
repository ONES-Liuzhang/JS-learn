import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/pagination" */ './radio')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),

  meta: { title: 'Radio' },
}
export const routes = [route]
