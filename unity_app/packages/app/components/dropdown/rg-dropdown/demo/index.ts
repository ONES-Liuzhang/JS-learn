import { generateUUID } from '@/app/libs/util'
const component = () => import('./dropdownDemo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID()
}
export const routes = [route]
