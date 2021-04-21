import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "demo/transfer" */ './transfer')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),

  meta: { title: 'Transfer' },
}
export const routes = [route]
