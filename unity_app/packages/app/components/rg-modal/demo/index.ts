import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "demo/modal-demo" */ './modal-demo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),
}

export const routes = [route]
