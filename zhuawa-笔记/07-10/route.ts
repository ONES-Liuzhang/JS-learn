import VueRouter, { RouteConfig } from "vue-router";

const Home = function () {};
const About = function () {};

export enum RoutePath {
  Index = "/",
  Home = "/home",
  About = "/about",
}

// 增加name
export enum RouteName {
  Index = "index",
  Home = "home",
  About = "about",
}

const routes: RouteConfig[] = [
  {
    path: RoutePath.Index,
    name: RouteName.Index,
    redirect: RoutePath.Home,
  },
  {
    path: RoutePath.Home,
    name: RouteName.Home,
    component: Home,
  },
  {
    path: RoutePath.About,
    name: RouteName.About,
    component: About,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
