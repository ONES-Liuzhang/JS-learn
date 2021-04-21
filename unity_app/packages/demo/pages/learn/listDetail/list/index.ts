import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/standard/color" */ './list')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),
  component,
  meta: { action: 'list' }
}
