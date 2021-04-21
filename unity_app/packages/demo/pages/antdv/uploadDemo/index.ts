import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/upload" */ './upload')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),
  meta: { title: 'Upload' },
}
export const routes = [route]
