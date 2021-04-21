/* eslint-disable prefer-destructuring */
// 全局配置
import devConfig from './dev'
import proConfig from './pro'

export type IConfig = {
  readonly env: string
  readonly isDev: boolean
  readonly isPro: boolean
  readonly baseUrl: string
}

export type IEnvConfig = {
  readonly baseUrl: string
}

export let env = ''
export const isDev = process.env.NODE_ENV === 'development' // 是否开发环境

export const isPro = process.env.NODE_ENV === 'production' // 是否生产环境

if (isDev) env = 'dev'
if (isPro) env = 'pro'

let config = null

if (isDev) {
  config = devConfig
} else if (isPro) {
  config = proConfig
}
export const baseUrl = config!.baseUrl

const c = Object.freeze({ ...config, env, isDev, isPro }) as IConfig

export default c
