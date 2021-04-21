import VueRouter from 'vue-router'
import { Component, Vue } from 'vue-property-decorator'

import { route as layoutRoute } from '../layout';

Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate'])

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    layoutRoute,
  ],
})

// router.beforeEach((from, to, next) => {
//   console.log(to);
//   next()
// })

router.onReady(() => {
  // console.log('路由准备就绪')
}, err => {
  console.log('VueRouter onReady', err)
})

router.onError(err => {
  console.log('路由错误', err)
})

export default router
