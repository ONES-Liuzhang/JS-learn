// 实现 addRoutes/addRoute/getRoutes 三个方法
// 路由跳转原理
/**
 * 以单页面SPA为例
 * 只有一个html，路由切换的时候其实是“组件的切换”，路由跳转之后，对页面进行重新渲染，视觉上就达到路由切换的效果
 * 多页面的SPA其实是多个单页面组成，原理是一样的
 * 路由和组件之间是一对一的关系
 * 路由之间会有嵌套 - 树形结构
 */

// 1. 先根据我们对VueRouter的使用入手
/**
 * 1-1. 用户传入的options
 * options: {
 *  mode: "history" | "hash"
 *  routes: RouteConfig[],
 *  ... 只实现基本的路由功能，其他的暂时不管
 * }
 */

/**
 * 1-2. RouteConfig的结构
 * routeConfig: {
 *  path: string    // "/foo" "/foo/bar"  "/foo/:id" 等,
 *  component: Component  // 对应的Vue组件
 *  components: {default: Component, name: Component} // 命名组件
 *  children: RouteConfig[]  // 嵌套路由
 * }
 */

// 2. 用户在注册路由的时候，需要把这些配置储存起来，方便之后查询
/**
 * record: {
 *  path: fullPath // 全路径 子路径会根据父路径做拼接
 *  regex: RegExp  // 一个正则，path可能会是这样的 -> "/foo/bar/:id" 会把它转化为正则表达式
 *  components: route.components || { default: route.component } // 储存定义的组件
 *  instances: {}  // TODO: 组件实例
 *  parent: Record // 父record，用于构建matched
 * }
 */

// 3. 定义一个描述确定路由的对象 route
/**
 * route: {
 *  path: string,  // 不带参数的路径
 *  fullPath: string, // 带参数的全路径
 *  query: Object,      // 参数
 *  components: Object, // 路由匹配的组件，支持命名路由
 *  matched: String[],  // 匹配的路径，根据这个路径去匹配路由，是实现路由生命周期的核心
 *  children: Route[]   // 子route
 * }
 */

// 明确储存对象的结构 - 方便查询
/**
 * pathMap : 路由切换的时候，要根据path 拿到route对象 最快的就是O(1)的复杂度，使用Map储存 key - path ， val - route
 * pathList:
 */
import { createRouteMap } from "./create-route-map.js";

// 储存路由配置
export function createMatcher(routes, router) {
  const { pathMap, pathList } = createRouteMap(routes);

  function match(raw, currentRoute) {
    const location = normalizeLocation(raw, currentRoute);

    for (let i = 0; i < pathList.length; i++) {
      const path = pathList[i];
      const record = pathMap[path];
      if (matchRoute(record.regex, location.path)) {
        return createRoute(record, location);
      }
    }

    return createRoute(null, location);
  }

  return { match };
}

function createRoute(record, location) {
  const route = {
    path: location.path || "/",
    query: location.query || {},
    hash: location.hash || "",
    // fullPath:
    matched: [],
  };

  while (record) {
    route.matched.unshift(record);
    record = record.parent;
  }

  // 不允许外部修改route
  return Object.freeze(route);
}

function matchRoute(regex, path) {
  return regex.match(path);
}

/**
 *
 * @param {*} location 携带路由信息的对象或字符串
 * @param {Route} currentRoute 当前路由对象
 */
function normalizeLocation(raw, currentRoute) {
  let next = typeof raw === "string" ? { path: raw } : raw;

  if (next._normalized) return next;

  const basePath = currentRoute.path || "/";
  const parsedPath = parsePath(raw.path);

  // 支持相对路径
  const path = resolvePath(parsedPath.path, basePath);

  const _normalized = true;

  return {
    _normalized,
    path,
    query,
    hash,
  };
}

function resolvePath(path, parent) {
  if (path[0] === "/") return path;
  path = (parent + path).replace(/\/\//g, "/");
  return path;
}

/**
 * 解析path 和location的对应关系：
 * location.hash    -> hash
 * location.pathname  -> path
 * location.search  -> query
 * @param {String} path
 */
function parsePath(path) {
  let hash = "",
    query = "";

  const hashIndex = path.indexOf("#");
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  const queryIndex = path.indexOf("?");
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }
  return {
    hash,
    query,
    path,
  };
}
