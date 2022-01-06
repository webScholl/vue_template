import Vue from 'vue'
import { getLocalStore, setLocalStore } from '@/utils/localStoreUtils'
import { changeTheme, isPc } from '@/utils/appUtils'
import config from '~/app.config'
import * as types from '../action-types'
export default {
  // namespaced: true,
  state: {
    version: config.version, // 版本
    lang: getLocalStore('LANG') || 'en', // 语言
    theme: changeTheme(getLocalStore('THEME') || config.initThemeColor) || 'defualt', // 主题
    type: isPc(), // 判断 pc or phone
    cancelTokens: [] // 存放当前页面已请求的cancelToken列表函数
  },
  mutations: {
    [types.SET_VERSION]: (state, payload) => {
      state.version = payload.version
    },
    [types.SET_LANG]: (state, payload) => {
      state.lang = payload.lang
    },
    [types.SET_THEME]: (state, payload) => {
      state.theme = payload.theme
    },
    [types.SET_CANCELTOKENS](state, payload) {
      if (payload === 'clear') {
        state.cancelTokens = []
      } else {
        state.cancelTokens = [...state.cancelTokens, payload]
      }
    }
  },
  actions: {
    [types.SET_THEME]({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        // 操作dom
        if (state.theme !== payload) {
          changeTheme(payload)
          // 进入下个事件队列
          Vue.nextTick(() => {
            commit(types.SET_THEME, { theme: payload })
            setLocalStore('THEME', payload)
            resolve(`切换${payload}主题成功`)
          })
        } else {
          // reject('重复设置主题')
          // eslint-disable-next-line prefer-promise-reject-errors
          // reject('重复设置主题')
          // resolve('重复设置主题')
        }
      })
    }
  }
}
