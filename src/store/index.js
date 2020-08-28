/* eslint-disable camelcase */
import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module
import app from './modules/app'

import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    app,
  },
  state: {
    user_phone: '13560295923',
    user_verif: '',
    verif_code: '',
    Messages: [],
  },
  mutations: {
    // eslint-disable-next-line camelcase
    phone_Message (state, user_phone) {
      // eslint-disable-next-line camelcase
      state.user_phone = user_phone
    },
    verif_Message (state, user_verif, verif_code, code) {
      state.user_verif = user_verif
      state.verif_code = code
    },
  },

})

Vue.use(VuexI18n.plugin, store)

export default store
