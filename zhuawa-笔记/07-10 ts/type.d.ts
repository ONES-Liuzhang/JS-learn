interface VueComponent {
  [k in String]: any;
}

interface Functional<T> {
  (): T;
}
declare module "vue-router" {
  export default VueRouter;
}

declare module "vue-router" {
  interface RouteConfig {
    path: string;
    name?: string;
    component?: VueComponent | Functional<VueComponent>;
    redirect?: string;
  }
}
