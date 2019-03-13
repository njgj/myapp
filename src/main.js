// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import { XHeader, ToastPlugin } from 'vux'
import axios from 'axios'
require('./mock')

// 把 `axios` 加到 `Vue` 的原型中
Vue.prototype.axios = axios
axios.defaults.baseURL = process.env.API_HOST

Vue.component('x-header', XHeader)
Vue.use(ToastPlugin, {position: 'top'})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
