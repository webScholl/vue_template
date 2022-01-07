// 动态权限路由
import asyncRoutes from '@/router/asyncRoutes'
import pageRoutes from '@/router/pageRoutes'
import { GET_PERMISSION, GENERATE_ROUTES, SET_KEEPALIVELIST, RESETROUTER } from '../action-types'
import {
  getPermission
} from '@/apis/login'
import { KeepAliveType } from '@/enums'
/**
 * 判断路由是否加载
 * @param route
 * @param menusPermission
 */
function hasPermission(route, menusPermission) {
  if (route.meta && route.meta.auth) {
    // 权限控制
    return menusPermission.some(menuPer => menuPer.auth === route.meta.auth)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合权限的路由表
 * @param asyncRoutes
 * @param menusPermission
 */

export function filterAsyncRoute(asyncRoutes, menusPermission) {
  const res = []

  asyncRoutes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(tmp, menusPermission)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoute(tmp.children, menusPermission)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  // namespaced: true,
  state: {
    hasGetPermission: false, // 权限状态
    menusPermission: [], // 菜单权限
    buttonsPermission: [], // 按钮权限
    routes: pageRoutes, // 所有页面管理
    dynamicRoutes: [], // 动态级路由
    keepAliveLayoutList: [], // layout页keepAlive
    keepAlivePageList: [], // page页keepAlive
    keepAliveCommonList: [], // 公共页keepAlive
    keepAliveAsyncRouteList: [] // 动态页keepAlive
  },
  mutations: {
    [GET_PERMISSION]: (store, payload) => {
      store.hasGetPermission = true
      store.menusPermission = payload.menusPermission
      store.buttonsPermission = payload.buttonsPermission
    },
    [GENERATE_ROUTES]: (state, routes) => {
      state.dynamicRoutes = routes
      state.routes = pageRoutes.concat(routes)
    },
    [SET_KEEPALIVELIST]: (state, routeObj) => {
      switch (routeObj.type) {
        case KeepAliveType.layout:
          state.keepAliveLayoutList = routeObj.routes
          break
        case KeepAliveType.page:
          state.keepAlivePageList = routeObj.routes
          break
        case KeepAliveType.common:
          state.keepAliveCommonList = routeObj.routes
          break
        case KeepAliveType.asyncPage:
          state.keepAliveAsyncRouteList = routeObj.routes
          break
      }
    },
    [RESETROUTER]: (state) => {
      state.dynamicRoutes = []
      state.routes = []
    }
  },
  actions: {
    [GET_PERMISSION]: ({
      commit
    }) => {
      return new Promise((resolve, reject) => {
        getPermission().then(
          res => {
            commit(GET_PERMISSION, res)
            resolve()
          },
          err => {
            reject(err)
          }
        )
      })
    },
    [GENERATE_ROUTES]({
      commit,
      state
    }) {
      return new Promise(resolve => {
        const dynamicRoutes = filterAsyncRoute(asyncRoutes, state.menusPermission)
        commit(GENERATE_ROUTES, dynamicRoutes)
        resolve(dynamicRoutes)
      })
    },
    [SET_KEEPALIVELIST]: ({
      commit
    }, routeObj) => {
      commit(SET_KEEPALIVELIST, routeObj)
    }
  }
}

export default permission
