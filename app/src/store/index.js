import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth.store'
import basket from './modules/basket.store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    basket
  }
})
