import { generateUUID } from '@/app/libs/util'

import router from '@/app/router'

const component = () => import( /* webpackChunkName: "base/login" */ './login')
export const route: RouteConfig = {
  path: '',
  name: generateUUID(),
  component,
  meta: {},
}

export const go = () => {
  router.push({ name: route.name })
}

export const routes = [route]
