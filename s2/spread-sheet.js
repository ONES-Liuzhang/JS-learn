import DataSet from "./data-set";
import Facet from "./facet";

export default class SpreadSheet {
  constructor(dataCfg, options) {
    this.dataCfg = dataCfg;
    this.options = options;

    this.dataSet = new DataSet(this);
  }

  buildFacet() {
    // 清空画布
    if (this.facet) {
      this.facet.distroy();
      this.facet = null;
    }

    // 重新绘制
    this.facet = new Facet({
      spreadSheet: this,
      dataSet: this.dataSet,
    });

    this.facet.render();
  }
}
