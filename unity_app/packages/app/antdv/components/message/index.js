// const Message = () => import('./message')
import message from './message'

message.install = function (Vue) {
  Vue.prototype.$message = message
}

export default message
