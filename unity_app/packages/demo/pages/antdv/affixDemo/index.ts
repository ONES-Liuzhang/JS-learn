import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "demo/affixDemo" */ './affixDemo')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),
  component,
  meta: { title: 'Affix' },
}

export const routes = [route]
