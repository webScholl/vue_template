import { throttle } from '../../utils/lodashUtils'
/**
 * @description:
 * 用法：v-lazy="'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'"
 */
const loadImageAsync = (src, resolve, reject) => {
  const image = new Image()
  image.src = src
  image.onload = resolve
  image.onerror = reject
}

const scrollParent = (el) => {
  let parent = el.parentNode
  while (parent) {
    if (/scroll/.test(getComputedStyle(parent).overflow)) {
      return parent
    }
    parent = parent.parentNode
  }
  return parent
}
const Lazy = (Vue) => {
  class ReactiveListener {
    constructor(el, src, options) {
      this.el = el
      this.src = src
      this.options = options
      // 定义状态
      this.state = { loading: false }
    }

    checkInView() {
      const { top } = this.el.getBoundingClientRect()
      return top < window.innerHeight * this.options.preLoad
    }

    elRenderer() {
      this.checkInView && this.load()
    }

    load() {
      this.elSetAttr('loading')
      loadImageAsync(this.src, () => {
        this.state.loading = true // 加载完毕了
        this.elSetAttr('loaded')
      }, () => {
        this.elSetAttr('error')
      })
    }

    elSetAttr(state) {
      let src = ''
      switch (state) {
        case 'loading':
          src = this.options.loading || ''
          break
        case 'error':
          src = this.options.error || ''
          break
        default:
          src = this.src
          break
      }
      this.el.setAttribute('src', src)
    }
  }
  return class LazyClass {
    constructor(options) {
      this.options = options
      this.listenerQueue = []
      this.bindHandler = false
    }

    add(el, bindings) {
      const listener = new ReactiveListener(el, bindings.value, this.options)
      this.listenerQueue.push(listener)
      if (!this.bindHandler) {
        this.bindHandler = true
        Vue.nextTick(() => {
          // 获取滚动元素
          const parent = scrollParent(el)
          parent.addEventListener('scroll', throttle(this.lazyLoadHandler.bind(this), 500), true)
        })
      }
      // 检测需要默认加载哪些数据
      this.lazyLoadHandler()
    }

    lazyLoadHandler() {
      for (const listener of this.listenerQueue) {
        listener.elRenderer()
      }
    }
  }
}
export default {
  install(Vue, options) {
    const LazyClass = Lazy(Vue)
    const lazy = new LazyClass(options)
    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy)
    })
  }
}
