import VueRouter from "vue-router";
import Vue from "vue";

// 注册插件
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main-box",
    component: () => import("@/components/main-box.vue"),
    children: [
      {
        path: "foo",
        name: "foo",
        component: () => import("@/components/foo.vue"),
      },
      {
        path: "bar",
        name: "bar",
        component: () => import("@/components/bar.vue"),
      },
      {
        path: "selectTree",
        name: "selectTree",
        component: () => import("@/components/element-select"),
      },
    ],
  },
  {
    path: "/todo",
    name: "todo",
    component: () => import("@/components/todo.vue"),
  },
];

const router = new VueRouter({ routes });

export default router;
