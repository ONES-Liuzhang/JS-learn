import { collectRouteConfigs } from '@/app/libs/route'



export const routes = collectRouteConfigs(
  require.context('.', true, /^\.\/([0-9a-zA-Z-]+)\/index.ts$/)
)
