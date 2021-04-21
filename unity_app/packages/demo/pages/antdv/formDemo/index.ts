import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "demo/pagination" */ './formDemo')
export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),
  meta: { title: 'Form' },
}
export const routes = [route]
