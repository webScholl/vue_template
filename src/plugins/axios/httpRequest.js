import axios from 'axios'
import store from '@/store'
import * as types from '../../store/action-types'
import handelRetry from './handelRetry'
class HttpRequest {
  constructor () {
    this.baseURL = process.env.baseUrl
    this.timeout = 5000
    this.queue = {} // 记录请求队列 {/:true}
  }

  setInterceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // 在发送请求之前做些什么
      if (!Object.keys(this.queue).length) {
        // 开启loading
      }
      this.queue[config.url] = true
      // 配置CancelToken并存储下来用于取消请求
      const CancelToken = axios.CancelToken
      config.cancelToken = new CancelToken(fn => {
        store.commit(types.SET_CANCELTOKENS, fn)
      })
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use(response => {
      delete this.queue[url]
      if (!Object.keys(this.queue).length) {
        // 关闭loading
      }
      // 对响应数据做点什么
      const { code } = response.data
      switch (code) {
        case 11002: // accessToken过期
          return handelRetry()
        default:
          break
      }
      return response
    }, function (error) {
      // 对响应错误做点什么
      delete this.queue[url]
      if (!Object.keys(this.queue).length) {
        // 关闭loading
      }
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    this.setInterceptors(instance, options.url)
    var config = { baseURL: this.baseURL, timeout: this.timeout, ...options }
    return instance(config)
  }

  get (url, params) {
    return this.request({
      url,
      params
    })
  }

  post (url, data) {
    return this.request({
      method: 'post',
      url,
      data
    })
  }
}
export default new HttpRequest()
