/**
 * @description: 返回顶部
 * 用法：v-scrollToTop="{ speed: 1, distance: 10 }"
 */
export default {
  bind (el, binding) {
    el.handler = () => {
      /**
       * @description: 定时器实现
       */
      // if (document.documentElement.scrollTop > 0) {
      //   const timer = setInterval(() => {
      //     if (document.documentElement.scrollTop <= 0) {
      //       clearInterval(timer)
      //       document.documentElement.scrollTop = 0
      //     }
      //     document.documentElement.scrollTop -= ((binding.value && binding.value.distance) || 10)
      //   }, ((binding.value && binding.value.speed) || 1))
      // }
      /**
       * @description: requestAnimationFrame实现 （不浪费CPU资源）
       */
      const c = document.documentElement.scrollTop || document.body.scrollTop
      if (c > 0) {
        scrollTo(0, c - ((binding.value && binding.value.distance) || 10))
        requestAnimationFrame(el.handler)
      } else {
        scrollTo(0, 0)
      }
    }
    // 绑定点击事件，返回顶部
    el.addEventListener('click', el.handler)
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind (el) {
    el.removeEventListener('click', el.handler)
  }
}
