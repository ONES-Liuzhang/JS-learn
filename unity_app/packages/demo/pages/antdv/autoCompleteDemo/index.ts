import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "demo/autoCompleteDemo" */ './autoCompleteDemo')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),
  component,
  meta: { title: 'AutoCompleteDemo' },
}
export const routes = [route]
