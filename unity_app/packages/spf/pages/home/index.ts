import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "spf/home" */ './home')
import router from '@/app/router'
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
