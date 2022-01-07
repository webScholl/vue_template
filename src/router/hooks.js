import store from '@/store'
import { SET_CANCELTOKENS, GET_PERMISSION, GENERATE_ROUTES, SET_KEEPALIVELIST, LOGOUT } from '@/store/action-types'
import { KeepAliveType } from '@/enums'
import { getKeepAliveRouterGenerator } from '@/router'
import { Toast } from 'vant'
import { isNprogress } from '~/app.config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  showSpinner: false
}) // 不显示转圈

export default {
  // 切换页面时 取消上一个页面发送的请求
  cancelToken: async function(to, from, next) {
    store.state.app.cancelTokens.forEach(fn => fn())
    store.commit(SET_CANCELTOKENS, 'clear')
    next()
  },
  // 鉴权
  provingPermission: async function(to, from, next) {
    if (isNprogress) NProgress.start()
    if (store.state.user.accessToken) {
      if (to.path === '/page/login') {
        next('/')
      } else {
        try {
        // 权限获取过了 直接返回
          if (store.state.permission.hasGetPermission) return next()
          // 获取权限数据
          await store.dispatch(GET_PERMISSION)
          // 过滤并生成动态路由 添加到路由管理
          const dynamicRoutes = await store.dispatch(GENERATE_ROUTES)
          // 存储动态路由的KeepAlive
          store.dispatch(SET_KEEPALIVELIST, { routes: getKeepAliveRouterGenerator(dynamicRoutes), type: KeepAliveType.asyncPage })
          // 动态添加可访问路由表
          this.addRoutes(dynamicRoutes)
          next({ ...to })
        } catch (error) {
          store.dispatch(LOGOUT)
          Toast.fail(error.message || 'has Error')
          next({
            path: `/page/login?redirect=${to.path}`
          })
        }
      }
    } else {
      if (to.matched.some(item => item.meta.needLogin)) {
        next({
          path: `/page/login?redirect=${to.path}`
        })
      } else {
        next()
      }
    }
  }
}
