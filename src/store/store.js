import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import router from '@/router'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    router
  },
  getters: getters
})

export default store
