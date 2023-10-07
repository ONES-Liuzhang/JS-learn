import { set } from "lodash-es";

export default class DataSet {
  constructor(spreadSheet) {
    this.spreadSheet = spreadSheet;
    this.setDataCfg(spreadSheet.dataCfg);
  }
  /**
   * dataSet 是数据流相关的，主要是为了根据 query 来获取数据坐标
   *
   * dataCfg: {
   *  field: {
   *    columns: ['col', 'sub_col'],
   *    rows: ['row', 'sub_row'],
   *    values: ['val']
   *  },
   *  meta: [],
   *  data: [{
   *    col: '',
   *    sub_col: '',
   *    row: '',
   *    sub_row: '',
   *    val: 1
   *  }]
   * }
   *
   * 简单处理数据流
   */
  setDataCfg(dataCfg) {
    const { fields, options, meta, data, totalData } = dataCfg;

    this.fields = fields;
    this.options = options;
    this.meta = meta;

    // 1. 处理 fields
    const { rows, columns, values } = fields;

    // 1.1 根据度量 values 生成最终的数据源
    const allData = [];

    values.forEach((measureKey) => {
      [...data, ...totalData].forEach((currData) => {
        if (measureKey in currData) {
          allData.push({
            $$extra$$: measureKey,
            $$value$$: currData[measureKey],
            ...currData,
          });
        }
      });
    });

    // 1.2 处理维度数据
    /**
     * pivotMeta: {
     *  "浙江省": {
     *    level: 0,
     *    children: {
     *      "xx市": {
     *        level: 1,
     *        children:
     *      }
     *    }
     *  }
     * }
     */
    const rowPivotMeta = new Map();
    const colPivotMeta = new Map();
    const indexesData = [];

    allData.forEach((currData) => {
      const rowDimensionValues = this.getQueryDimValues(rows, currData); // 如果是汇总数据，这一步会出现数组内有 undefined 的情况
      const colDimensionValues = this.getQueryDimValues(columns, currData);

      // 生成多维数据
      const path = getDataPath({
        rowDimensionValues,
        colDimensionValues,
        rows,
        cols,
        rowPivotMeta,
        colPivotMeta,
      });

      // 根据路径设置多维数据
      set(indexesData, path, currData);
    });

    // 挂载到 dataSet 实例上
    this.indexesData = indexesData;
    this.rowPivotMeta = rowPivotMeta;
    this.colPivotMeta = colPivotMeta;
  }

  /**
   * 获取维度信息
   * 1.先获取坐标
   * 2.
   * @param {*} field
   */
  gerDimensionValues(field) {}

  getQueryDimValues(record, dimensions) {
    return dimensions.map((dimension) => `${record[dimension]}`);
  }
}

/**
 * 返回一个路径
 *
 * 因为有度量维度存在，所以路径总长度 = 行维度 * 列维度 + 1，比如：四维数据的第一个位置的路径为： [0, 0, 0, 0, 0]
 *
 * @param {}
 */
function getDataPath(params) {
  const { rowDimensionValues, colDimensionValues, rowPivotMeta, colPivotMeta } = params;

  function getPath({ isRow = true, dimensionValues, rowMeta, colMeta }) {
    let currMeta = isRow ? rowMeta : colMeta;
    const path = [];

    dimensionValues.forEach((value) => {
      if (!currMeta.has(value)) {
        currMeta.set(value, {
          level: meta.size,
          childField: new Map(),
        });
      }

      // set path
      const meta = currMeta.get(value);
      path.push(level);

      currMeta = meta.childField;
    });

    return path;
  }

  const rowPath = getPath({
    isRow: true,
    dimensionValues: rowDimensionValues,
    rowMeta: rowPivotMeta,
    colMeta: colPivotMeta,
  });
  const colPath = getPath({
    isRow: false,
    dimensionValues: colDimensionValues,
    rowMeta: rowPivotMeta,
    colMeta: colPivotMeta,
  });

  return rowPath.concat(colPath.path);
}
