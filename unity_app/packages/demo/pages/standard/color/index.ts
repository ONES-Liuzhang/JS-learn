import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/standard/color" */ './color')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),

  component,
  meta: { title: '颜色' },
}
export const routes = [route]
