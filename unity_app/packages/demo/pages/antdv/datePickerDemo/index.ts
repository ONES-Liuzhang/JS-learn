import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "demo/datePickerDemo" */ './datePickerDemo')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),
  component,
  meta: { title: 'DatePicker' },
}
export const routes = [route]
