import Vue from 'vue';
import router from './router'
import { callFunc } from '@/app/libs/request'
import config from './config'
import Main from './main'
import './extend'
import './styles/index.less'

// import axios from 'axios'

Vue.prototype.$callFunc = callFunc
Vue.prototype.$config = config
Vue.config.productionTip = false

window.vm = new Vue({
  router,
  render: h => h(Main),
}).$mount('#app');


// const script = document.createElement('script')
// script.src = 'https://kyz.pingan.com.cn/'
// document.body.appendChild(script)

// script.onload = () => {
//   debugger
// }
// script.onerror = () => {
//   debugger
// }

// axios.get('https://kyz.pingan.com.cn/').then(({ data }) => {
//   debugger
// }).catch(err => {
//   debugger
// })
