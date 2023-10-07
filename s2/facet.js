/**
 * 透视表布局是根据行、列决定的
 *
 * 1.生成行、列层级结构
 * 2.计算尺寸信息
 */
export default class Facet {
  constructor(params) {
    const { spreadSheet, dataSet } = params;
    const { options, dataCfg } = spreadSheet;
    const { fields } = dataCfg;

    this.spreadSheet = spreadSheet;
    this.dataSet = dataSet;
    this.fields = fields;
  }

  /** 布局 */
  doLayout() {}

  /** 渲染 */
  render() {}
}
