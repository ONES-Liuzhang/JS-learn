import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "demo/dividerDemo" */ './dividerDemo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),
  meta: { title: 'Divider' },
}
export const routes = [route]
