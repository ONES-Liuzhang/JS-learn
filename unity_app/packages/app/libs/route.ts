/*
 * 收集路由配置
 */
export const collectRouteConfigs = (requireContext: __WebpackModuleApi.RequireContext,
  mKey ? : string,
  cb ? : (m: any, path: string) => void
) => {
  const children: RouteConfig[] = []
  requireContext.keys().forEach(key => {
    const pathList = key.split('/')
    pathList.pop()
    pathList.shift()
    const m = requireContext(key)
    const tempRoutes = m.routes as RouteConfig[]
    if (!tempRoutes || tempRoutes.length === 0) return
    const path = mKey ? (`${mKey}/${pathList.join('/')}`) : pathList.join('/')
    if (cb) cb(m, path)
    tempRoutes.forEach((tempRoute: RouteConfig, index: number) => {
      let tempPath = tempRoute.path

      if (tempPath) {
        tempPath = `${path}/${tempPath}`
      } else {
        let tempMeta = tempRoute.meta || (tempRoute.meta = {})
        let tempAction = tempMeta.action // || `action${index}`
        if (tempAction) tempPath = `${path}_${tempAction}`
        else if (index === 0) tempPath = path
        else tempPath = `${path}_action${index}`
      }
      tempRoute.path = tempPath
      children.push(tempRoute)
    })

  })
  return children
}
