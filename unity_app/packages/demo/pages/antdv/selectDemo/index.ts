import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/select" */ './select-demo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),
  meta: { title: 'Select' },
}

export const routes = [route]
