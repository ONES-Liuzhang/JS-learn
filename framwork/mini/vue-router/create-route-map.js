import { pathToRegexp } from "./node_modules/path-to-regexp/dist.es2015/index.js";

export function createRouteMap(routes) {
  const pathMap = Object.create(null);
  const pathList = [];

  routes.forEach((route) => {
    addRouteRecord(pathMap, pathList, route, null);
  });

  return { pathMap, pathList };
}

function addRouteRecord(pathMap, pathList, route, parent) {
  const normalizedPath = normalizePath(route.path, parent);
  const record = {
    path: normalizedPath,
    regex: pathToRegexp(normalizedPath),
    components: route.components
      ? route.components
      : { default: route.component },
    parent,
  };
  if (route.children) {
    route.children.forEach((child) => {
      addRouteRecord(pathMap, pathList, child, route);
    });
  }
  if (!pathMap[record.path]) {
    pathMap[record.path] = record;
    pathList.push(normalizedPath);
  }
}

function normalizePath(path, parent, strict) {
  if (!strict) path = path.replace(/\/$/, "");
  if (path[0] === "/") return path;
  if (parent == null) return path;
  return `${parent}/${path}`.replace(/\/\//g, "");
}
