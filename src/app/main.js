// Polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { ColorThemePlugin } from '../services/vuestic-ui'
import store from '../store/index'
import router from '../router/index'
import { VuesticPlugin } from '../services/vuestic-ui/components'
import '../i18n/index'
import YmapPlugin from 'vue-yandex-maps'
import VueClipboard from 'vue-clipboard2'
import axios from 'axios'
import VueAxios from 'vue-axios'

import '../metrics'
import '../registerServiceWorker'

import { consoleBuildInfo } from 'vue-cli-plugin-build-info/plugin'
import instance_ from '../api/index'

Vue.prototype.$http = axios
Vue.prototype.instance = instance_ // axios实例
consoleBuildInfo()

Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)
Vue.use(VueClipboard)
Vue.use(VueAxios, axios)
Vue.use(ColorThemePlugin, {
  primary: '#6c7fee',
  secondary: '#6e7ff1',
  success: '#8ddc88',
  info: '#71baff',
  danger: '#f8706d',
  warning: '#ffd652',
  gray: '#8396a5',
  dark: '#34495e',
  // override colors here.
},
)

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)
  next()
})

router.afterEach((to, from) => {
  store.commit('setLoading', false)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
