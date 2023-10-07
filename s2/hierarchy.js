/** 行、列头层级结构 */
class Hierarchy {}

/**
 * 构建层级结构，生成树结构
 *
 * params: {
 *  currentField: 'province',
 *  fields: ['province', 'city'],
 *  hierarchy: new Hierarchy(),
 *  facetCfg: {}
 * }
 *
 * @param {*} params
 */
function buildGridHierarchy(params) {
  const { currentField, fields, hierarchy, facetCfg } = params;
  const { dataSet } = facetCfg;

  const dimValues = dataSet.getQueryDimValues(currentField);
}
