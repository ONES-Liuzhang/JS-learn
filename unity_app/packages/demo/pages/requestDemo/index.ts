import { collectRouteConfigs } from '@/app/libs/route'



export const routes = collectRouteConfigs(
  require.context('.', true, /^\.\/([a-zA-Z-]+)\/index.ts$/)
)
