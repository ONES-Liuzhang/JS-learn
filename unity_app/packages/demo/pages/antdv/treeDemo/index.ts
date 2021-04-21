import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/tree" */ './treeDemo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),

  meta: { title: 'Tree' },
}
export const routes = [route]
