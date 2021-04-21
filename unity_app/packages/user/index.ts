// import { routes as LoginRoutes } from './pages/login'
import { collectRouteConfigs } from '@/app/libs/route'


export const routes: RouteConfig[] = collectRouteConfigs(
  require.context('./pages', true, /^\.\/([a-zA-Z-]+)\/index.ts$/),
  'user',
)


console.log('用户模块路由', routes);
