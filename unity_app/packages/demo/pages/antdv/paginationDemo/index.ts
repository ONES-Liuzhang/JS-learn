import { generateUUID } from '@/app/libs/util'
const component = () => import( /* webpackChunkName: "demo/pagination" */ './paginationDemo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),

  meta: { title: 'Pagination' },
}
export const routes = [route]
