import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/rg-form-model/model1" */ './model1')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),

  component,
  // meta: { title: '颜色' },
}
export const routes = [route]
