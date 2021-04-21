import { generateUUID } from '@/app/libs/util'
const component = () => import('./checkboxDemo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID()
}
export const routes = [route]
