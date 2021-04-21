import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/standard/color" */ './vModelTest')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),
  component,
}
export const routes = [route]
