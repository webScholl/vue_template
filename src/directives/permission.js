/**
 * @description: 对需要权限判断的 Dom 进行显示隐藏
 * 用法：v-permission="1"
 */
export default {
  inserted(el, binding) {
    const arr = [1, 2, 3, 4]
    const permission = binding.value
    const hasPermission = arr.indexOf(permission) !== -1
    if (!hasPermission) {
      // 没有权限 移除Dom元素
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
