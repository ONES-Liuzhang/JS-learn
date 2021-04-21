import { generateUUID } from '@/app/libs/util'


const component = () => import( /* webpackChunkName: "demo/btn" */ './btnDemo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),
  meta: { title: 'Button' },
}
export const routes = [route]
