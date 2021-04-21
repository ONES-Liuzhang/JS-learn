import { route as layoutRoute } from './layout';
import router from '@/app/router'
export const routes = [layoutRoute]

export const go = () => {
  router.push({ name: layoutRoute.name })
}

// 导出模块菜单
export const mMenus = [{
  title: '案例',
  key: layoutRoute.name,
  onClick: go,
}]
