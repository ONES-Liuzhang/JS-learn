# VueRouter

vue-cli 新建了一个 vue 的项目, ts

## 导航守卫执行顺序

面试题！！！！

1. 【组件】前一个组件的 beforRouteLeave
2. 【全局】的 router.beforeEach
   (3). 【组件】如果是路由参数变化，触发 beforeRouteUpdate
3. 【配置文件】里, 下一个的 beforeEnter
4. 【组件】内部声明的 beforeRouteEnter
5. 【全局】的 router.afterEach

面试题！！

vue-router 里面，怎么记住前一个页面的滚动条的位置。

滚动到了{ top: 100 }
list -> detail -> list

scrollBehavior 生效的条件

1. 浏览器支持 history api
2. 页面间的交互是通过 go, forward, back 或者 浏览器的前进/返回按钮

```js
// 1. 记住：手动点击浏览器返回或者前进按钮 ，基于history，go,back,forward
// 2. 没记住：router-link，

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    console.log(savedPosition); // 已报错的位置信息
    return savedPosition;
  },
});
```
