const fieldNames = {
  rowKey: "key",
  children: "children",
};

/** 获取扁平数据 */
function flattenData(source, fieldNames) {}

/**
 * entity 除了包含源数据外，还需要一些额外信息，比如：
 *
 * 是否可展开 expandable
 *
 * 是否可以选择 selectable
 *
 * 是否禁用 disabled
 *
 * 并且这些属性是必存在的，因为这是我们自己构造的结构
 */
interface DataEntity<T> {
  data: T;
  parent: DataEntity<T> | null;
  key: string;
  level: number;
  pos: string;
  pathNodes: DataEntity<T>[];
  children: DataEntity<T>[];
}

/** 把源数据转化为 entites 作为缓存依据 */
function convertDataToEntites(data, fieldNames, { dataProcesser }) {
  const keyEntities = {};
  const levelEntites = {};

  const wrapper = {
    keyEntities,
    levelEntites,
  };

  traverseDataNodes(
    data,
    (entity) => {
      const { key, level } = entity;
      keyEntities[key] = entity;

      levelEntites[level] = levelEntites[level] || [];
      levelEntites[level].push(entity);

      dataProcesser?.(entity);
    },
    { fieldNames }
  );

  return wrapper;
}

/** 获取 rowKey */
function getRowKey(key, record) {
  return typeof key === "function" ? key(record) : key;
}

/** 遍历 node 节点 */
function traverseDataNodes<T>(dataNodes, processer, config) {
  const { fieldNames } = config;
  const { key: fieldKey, children: fieldChildren } = fieldNames;

  function processNode(node: T, index: number, parent: DataEntity<T>, pathNodes: DataEntity<T>[], level: number) {
    const children = node[fieldChildren];
    const key = getRowKey(fieldKey, node);
    const entity: DataEntity<T> = {
      key,
      data: node,
      parent,
      level,
      pos: parent.pos ? `${index}` : `${parent.pos}-${index}`,
      pathNodes,
      children: [],
    };

    if (Array.isArray(children)) {
      children.forEach((child, childIndex) => {
        processNode(child, childIndex, entity, pathNodes.concat(entity), level + 1);
      });
    }

    parent.children.push(entity);
    processer?.(entity);
  }

  dataNodes.forEach((node, index) => processNode(node, index, null, [], 0));
}
