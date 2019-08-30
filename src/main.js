import Vue from 'vue'

import Cookies from 'js-cookie'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import store from './store'

import './icons'
import './permission'
import './utils/error-log'

/** Mockjs */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// filters

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
