import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "demo/request/html2canvas_baseUse" */ './baseUse')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),
  component,
  meta: { title: '基本用法' },
}
export const routes = [route]
