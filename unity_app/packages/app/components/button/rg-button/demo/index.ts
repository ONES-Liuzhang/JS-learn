import { generateUUID } from '@/app/libs/util'
const component = () => import('./buttonDemo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID()
}
export const routes = [route]
