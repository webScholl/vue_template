import { setStyle, getFatherNodeByStyle } from '@/utils/domUtils'
/**
 * @description: 拖拽指令
 * 用法：v-drag
 */
export default {
  bind(el) {
    setStyle(el, {
      position: 'fixed',
      zIndex: 1,
      cursor: 'pointer'
    })
    el.handler = e => {
      const diffX = e.clientX - el.offsetLeft
      const diffY = e.clientY - el.offsetTop
      // 获取定位的父元素
      const positioningOfParent = getFatherNodeByStyle(el, { position: 'relative' })
      // const positioningOfParent = el.offsetParent
      // 水平方向可移动的最大偏移量
      const MaxL = positioningOfParent.offsetWidth - el.offsetWidth
      const MaxV = positioningOfParent.offsetHeight - el.offsetHeight
      document.onmousemove = e => {
        // 计算移动的距离
        let l = e.clientX - diffX
        if (l < 0) {
          l = 0
        } else if (l > MaxL) {
          l = MaxL
        }

        let v = e.clientY - diffY
        if (v < 0) {
          v = 0
        } else if (v > MaxV) {
          v = MaxV
        }
        // 移动当前元素
        setStyle(el, {
          left: `${l}px`,
          top: `${v}px`,
          cursor: 'move'
        })
      }
      document.onmouseup = function(e) {
        document.onmousemove = null
        setStyle(el, {
          cursor: 'pointer'
        })
      }
    }
    // 绑定点击事件
    el.addEventListener('mousedown', el.handler)
  }
}
