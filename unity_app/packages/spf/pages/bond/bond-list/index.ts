import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "spf/bond/list" */ './bond-list')
import router from '@/app/router'
export const route: RouteConfig = {
  path: '',
  name: generateUUID(),
  component,
}

export const go = () => {
  router.push({ name: route.name })
}
export const routes = [route]
