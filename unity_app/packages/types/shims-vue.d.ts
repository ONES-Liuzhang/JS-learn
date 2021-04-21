import { AxiosInstance } from 'axios'

import Vue, { VNode as VueVNode, ComponentOptions, AsyncComponent, VNodeData as VueVNodeData } from 'vue'
import { ICallFunc } from '@/app/libs/request'
// import VueRouter, { RouteConfig } from 'vue-router'
import {
  RouteConfig as VueRouteConfig,
  RawLocation as VueRawLocation,
  Route as VueRoute,

} from 'vue-router'

import { IConfig } from '@/app/config'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $axios: AxiosInstance
    readonly $callFunc: ICallFunc
    // readonly ref ? : string
    readonly $config: IConfig;
    [key: string]: any

    // beforeRouteEnter ? (
    //   to: Route,
    //   from: Route,
    //   next: (to ? : RawLocation | false | ((vm: Vue) => void)) => void
    // ) : void

    // beforeRouteLeave ? (
    //   to: Route,
    //   from: Route,
    //   next: (to ? : RawLocation | false | ((vm: Vue) => void)) => void
    // ) : void

    // beforeRouteUpdate ? (
    //   to: Route,
    //   from: Route,
    //   next: (to ? : RawLocation | false | ((vm: Vue) => void)) => void
    // ) : void
  }
}



declare module 'vue/types/options' {
  interface ComponentOptions < V extends Vue > {
    [key: string]: any
  }



}

declare global {
  type VNode = Vue.VNode
  type VNodeData = VueVNodeData

  // eslint-disable-next-line no-undef
  type Component = ComponentOptions | typeof Vue | AsyncComponent

  type CreateElement = Vue.CreateElement
  type RenderContext = Vue.RenderContext
  type ComponentOptions = Vue.ComponentOptions < any >
    type RouteConfig = VueRouteConfig
  type RawLocation = VueRawLocation
  type Route = VueRoute
}
