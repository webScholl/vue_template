import {
  login,
  getUserInfo,
  updateToken
} from '@/apis/login'
import {
  setLocalStore,
  getLocalStore
} from '@/utils/localStoreUtils'
import { resetRouter } from '@/router'

import { LOGIN, SET_TOKEN, UPDATE_TOKEN, SET_USERINFO, LOGOUT, RESETROUTER } from '../action-types'

export default {
  // namespaced: true,
  state: {
    accessToken: getLocalStore('ACCESSTOKEN') || null, // 访问令牌
    refreshToken: getLocalStore('REFRESHTOKEN') || null, // 替换令牌
    userInfo: JSON.parse(getLocalStore('USERINFO')) || {} // 用户信息
  },
  mutations: {
    [SET_TOKEN]: (state, payload) => {
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
      setLocalStore('ACCESSTOKEN', payload.accessToken)
      setLocalStore('REFRESHTOKEN', payload.refreshToken)
    },
    [SET_USERINFO]: (state, payload) => {
      state.userInfo = payload
      setLocalStore('USERINFO', payload)
    }
  },
  actions: {
    [LOGIN]: ({ commit }, payLoad) => {
      return new Promise((resolve) => {
        login(payLoad).then(res => {
          commit(SET_TOKEN, res)
          resolve()
        })
      })
    },
    [SET_USERINFO]: ({
      commit
    }) => {
      return new Promise(() => {
        getUserInfo().then(
          res => {
            commit(SET_USERINFO, res)
          }
        )
      })
    },
    [LOGOUT]: ({
      commit
    }) => {
      return new Promise((resolve, reject) => {
        commit(SET_TOKEN, { accessToken: null, refreshToken: null })
        commit(SET_USERINFO, {})
        // 重置路由
        resetRouter()
        commit(RESETROUTER)
        resolve()
      })
    },
    [UPDATE_TOKEN]: ({ commit }) => {
      return new Promise((resolve, reject) => {
        updateToken().then(
          res => {
            commit(SET_TOKEN, res)
            resolve(res)
          }
        )
      })
    }
  }
}
