import Vue from 'vue'
import VueRouter from 'vue-router'
import layoutRoutes from './layoutRoutes'
import pageRoutes from './pageRoutes'
import store from '@/store'
import { SET_KEEPALIVELIST } from '@/store/action-types'
import { KeepAliveType } from '@/enums'
import { setTitle } from '@/utils/appUtils'
import { isNprogress } from '~/app.config'
import hooks from './hooks'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 复写warn方法方便检查由于使用name跳转无法监控404的问题
const sourceWarn = window.console.warn
window.console.warn = function(...rest) {
  const args = Array.from(rest)
  if (args[0] && args[0].includes('Route with name') && args[0].includes('does not exist')) {
    console.log('预备跳转404')
    setTimeout(() => {
      router.push('/404')
    }, 0)
  }
  sourceWarn(...rest)
}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 去除路由重定向报错
Vue.use(VueRouter)

const commonRoutes = [
  {
    path: '',
    redirect: '/layout/home'
  },
  {
    path: '/page',
    redirect: '/layout/home'
  }
]
const routes404 = [
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404',
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "404" */ '../views/404/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]
const routes = [
  ...commonRoutes,
  ...layoutRoutes,
  ...pageRoutes,
  ...routes404
]
// 收集keepAlive 路由
export function getKeepAliveRouterGenerator(Routes, keepAliveRoutes = []) {
  Routes.forEach(Route => {
    if (Route.meta && Route.meta.keepAlive) {
      if (Route.name) {
        keepAliveRoutes.push(Route.name)
      }
    }
    if (Route.children && Route.children.length) {
      getKeepAliveRouterGenerator(Route.children, keepAliveRoutes)
    }
  })
  return keepAliveRoutes
}
store.dispatch(SET_KEEPALIVELIST, { routes: getKeepAliveRouterGenerator(commonRoutes), type: KeepAliveType.common })
store.dispatch(SET_KEEPALIVELIST, { routes: getKeepAliveRouterGenerator(layoutRoutes), type: KeepAliveType.layout })
store.dispatch(SET_KEEPALIVELIST, { routes: getKeepAliveRouterGenerator(pageRoutes), type: KeepAliveType.page })

const createRouter = () => new VueRouter({
  mode: 'hash', // history,hash 模式  hash模式兼容性高
  base: process.env.BASE_URL, // 基础路径
  scrollBehavior: () => ({ y: 0 }),
  routes // 路由集
})

const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

Object.entries(hooks).forEach(([key, hook]) => {
  router.beforeEach(hook.bind(router))
})
router.afterEach((to) => {
  setTitle(to)
  if (isNprogress) NProgress.done()
})
export default router
