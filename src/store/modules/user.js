import {
  login,
  getUserInfo,
  getAccesstoken
} from '@/apis/login'
import {
  setLocalStore,
  getLocalStore
} from '@/utils/localStoreUtils'
import { resetRouter } from '@/router'

import * as types from '../action-types'

export default {
  // namespaced: true,
  state: {
    accessToken: getLocalStore('ACCESSTOKEN') || null, // 访问令牌
    refreshToken: getLocalStore('REFRESHTOKEN') || null, // 替换令牌
    userInfo: JSON.parse(getLocalStore('USERINFO')) || {} // 用户信息
  },
  mutations: {
    [types.SET_ACCESSTOKEN]: (state, payload) => {
      state.accessToken = payload
      setLocalStore(types.ACCESSTOKEN, payload)
    },
    [types.SET_REFRESHTOKEN]: (state, payload) => {
      state.refreshToken = payload
      setLocalStore(types.REFRESHTOKEN, payload)
    },
    [types.SET_USERINFO]: (state, payload) => {
      state.userInfo = payload
      setLocalStore(types.USERINFO, payload)
    }
  },
  actions: {
    [types.LOGIN]: ({ commit }, options) => {
      return new Promise((resolve, reject) => {
        login(options).then(res => {
          commit(types.SET_ACCESSTOKEN, res.accessToken)
          commit(types.SET_REFRESHTOKEN, res.refreshToken)
          resolve()
        })
      })
    },
    [types.SET_USERINFO]: ({
      commit
    }) => {
      return new Promise((resolve, reject) => {
        getUserInfo().then(
          res => {
            commit(types.SET_USERINFO, res)
            resolve(res)
          }
        )
      })
    },
    [types.LOGOUT]: ({
      commit
    }) => {
      return new Promise((resolve, reject) => {
        commit(types.SET_ACCESSTOKEN, null)
        commit(types.SET_REFRESHTOKEN, null)
        commit(types.SET_USERINFO, {})
        // 重置路由
        resetRouter()
        commit(types.RESETROUTER)
        resolve()
      })
    },
    [types.REFRESH_TOKEN]: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getAccesstoken().then(
          res => {
            commit(types.SET_ACCESSTOKEN, res.accessToken)
            commit(types.SET_REFRESHTOKEN, res.refreshToken)
            resolve(res)
          }
        )
      })
    }
  }
}
