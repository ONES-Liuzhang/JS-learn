export function createRoute(record, location) {
  const route = {
    path: location.path || "/",
    query: location.query || {},
    hash: location.hash || "",
    fullPath: getFullPath(location),
    matched: [],
  };

  while (record) {
    route.matched.unshift(record);
    record = record.parent;
  }

  // 不允许外部修改route
  return Object.freeze(route);
}

export function matchRoute(regex, path) {
  return regex.match(path);
}

// TODO: 处理query
function getFullPath(location) {
  const { path, hash, query } = location;
  return path + hash;
}
