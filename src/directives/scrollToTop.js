/**
 * @description: 返回顶部
 * 用法：v-scrollToTop="{ speed: 1, distance: 10 }"
 */
export default {
  bind(el, binding) {
    el.handler = () => {
      if (document.documentElement.scrollTop > 0) {
        const timer = setInterval(() => {
          if (document.documentElement.scrollTop <= 0) {
            clearInterval(timer)
            document.documentElement.scrollTop = 0
          }
          document.documentElement.scrollTop -= ((binding.value && binding.value.distance) || 10)
        }, ((binding.value && binding.value.speed) || 1))
      }
    }
    // 绑定点击事件，返回顶部
    el.addEventListener('click', el.handler)
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
}
