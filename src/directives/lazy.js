/**
 * @description:
 * 用法：v-drag
 */
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
  return class LazyClass {
    constructor(options) {
      this.options = options
    }

    add(el, bindings) {
      Vue.nextTick(() => {
        // 获取滚动元素
        const parent = scrollParent(el)
        parent.addEventListener('scroll', this.lazyLoadHandler.bind(this))
      })
    }

    lazyLoadHandler() {

    }
  }
}
const LazyClass = Lazy()
const lazy = new LazyClass()
export default {
  bind: lazy.add().bind(lazy)
}
