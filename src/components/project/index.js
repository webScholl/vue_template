import Vue from 'vue'
// require.context 是webpack的一个api
const requireContext = require.context('./', false, /\.vue$/)
// 全局注册
requireContext.keys().forEach(key => {
  const module = requireContext(key)
  let name = key.replace(/(\.\/)|(\.vue)/ig, '')
  name = module.default.name || name
  Vue.component('mc' + name.replace(/[A-Z]/g, i => `-${i.toLowerCase()}`), module.default)
})
