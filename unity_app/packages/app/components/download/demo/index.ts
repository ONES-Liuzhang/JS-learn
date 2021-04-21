import { generateUUID } from '@/app/libs/util'

const component = () => import( /* webpackChunkName: "demo/download-demo" */ './download-demo')

export const route: RouteConfig = {
  path: '',
  component,
  name: generateUUID(),
  // meta: { title: '图片上传' },
}

export const routes = [route]
