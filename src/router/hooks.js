import store from '@/store'
import * as types from '@/store/action-types'
export default {
  // 切换页面时 取消上一个页面发送的请求
  cancelToken: async(to, from, next) => {
    store.state.app.cancelTokens.forEach(fn => fn())
    store.commit(types.SET_CANCEL_TOKENS, 'clear')
    next()
  }
}
