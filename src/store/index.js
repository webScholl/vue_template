import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
Vue.use(Vuex)
const store = new Vuex.Store({
  // getter 数据
  getters: {
    app: state => state.app,
    user: state => state.user,
    permission: state => state.permission
  },
  modules: {
    user,
    app,
    permission
  }
})
export default store
