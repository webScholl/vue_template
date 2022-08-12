/**
 * @description: 实现长按，用户需要按下并按住按钮几秒钟，触发相应的事件
 * 用法： v-longpress="handler"
 */
export default {
  bind: function(el, binding) {
    if (typeof binding.value !== 'function') {
      throw 'callback must be a function'
    }
    // 定义变量
    el.pressTimer = null
    // 创建计时器（ 2秒后执行函数 ）
    const start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }
      if (el.pressTimer === null) {
        el.pressTimer = setTimeout(() => {
          handler()
        }, 2000)
      }
    }
    // 取消计时器
    const cancel = (e) => {
      if (el.pressTimer !== null) {
        clearTimeout(el.pressTimer)
        el.pressTimer = null
      }
    }
    // 运行函数
    const handler = (e) => {
      binding.value(e)
    }
    // 添加事件监听器
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    // 取消计时器
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
}
