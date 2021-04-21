import { generateUUID } from '@/app/libs/util'

// const bus = new Vue()
// bus.$on('in', () => {
// })
// bus.$emit('in', 332)


import router from '@/app/router'
const component = () => import( /* webpackChunkName: "demo/standard/color" */ './detail')

export const route: RouteConfig = {
  path: '',
  name: generateUUID(),
  component,
  meta: { action: 'detail' }
}

const sessionKey = 'detail_key'
export const go = (item: any) => {
  sessionStorage.setItem(sessionKey, JSON.stringify(item))
  router.push({ name: route.name, query: { id: item.id } })
}

export const getSessionData = () => {
  let str = sessionStorage.getItem(sessionKey) as string
  if (!str) return null
  return JSON.parse(str)
}


export const x = ''
