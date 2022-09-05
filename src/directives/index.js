import copy from './copy'
import longpress from './longpress'
import emoji from './emoji'
import scrollToTop from './scrollToTop'
import drag from './drag'
import permission from './permission'
import waterMarker from './waterMarker'

import lazy from './useDirectives/lazy'
// 自定义指令
const directives = {
  copy,
  longpress,
  emoji,
  scrollToTop,
  drag,
  permission,
  waterMarker
}
export default {
  // 注册方法
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key])
    })
    Vue.use(lazy, {
      preLoad: 1.3, // 可见区域的1.3倍
      loading: 'https://sponsors.vuejs.org/images/loading.avif',
      error: 'https://fastly.jsdelivr.net/npm/@vant/assets/error.jpeg'
    })
  }
}
