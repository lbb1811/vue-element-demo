import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css'

import ElementUI from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import store from './store'

import './icons'
import './permission'
import './utils/error-log'

import * as filters from './filters' // global filters

/** Mockjs */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
