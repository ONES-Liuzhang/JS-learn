import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/standard/color" */ './lifeCycle')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),
  component,
}
export const routes = [route]
