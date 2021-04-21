import Vue from 'vue'
import AsyncValidator, { RuleItem as AsyncValidatorRuleItem } from 'async-validator'
declare global {
  interface Window {
    vm: Vue
    ABC: any
  }
  type RuleItem = AsyncValidatorRuleItem
  // type RuleValidator = () => 

  type RouteMapType = {
    [key: string]: RouteConfig
  }


  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {

    }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {

    }
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
  namespace Member {
    interface IMenu {
      key ? : string // 跳转的唯一标识
      title: string // 标题
      getRoute: () => RawLocation // 获取路由
      iconComponent: any
      order ? : number // 排序
    }
  }

  namespace User {
    interface IMenu {
      key ? : string // 跳转的唯一标识
      title: string // 标题
      getRoute: () => RawLocation // 获取路由

      iconComponent ? : any
      order: number
    }
  }


  namespace Upload {
    interface IFileMeta {
      id: string
      name: string // file name
      status: string
      // type: string
      url ? : string
      file ? : File
    }
  }
}
