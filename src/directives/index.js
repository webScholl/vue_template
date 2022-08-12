import copy from './copy'
import longpress from './longpress'
import emoji from './emoji'
import scrollToTop from './scrollToTop'
import drag from './drag'
// 自定义指令
const directives = {
  copy,
  longpress,
  emoji,
  scrollToTop,
  drag
}
export default {
  // 注册方法
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key])
    })
  }
}
