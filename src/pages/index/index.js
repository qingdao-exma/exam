// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from '@a/js/ajaxService.js'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@a/css/fonts.css'
import '@a/css/AdminLTE.min.css'
import '@a/css/all-skins.min.css'
import 'normalize-css'
import 'element-ui/lib/theme-chalk/index.css'
import '@a/css/app.css'
import $ from 'jquery'

var _ = require('lodash')
window._ = _
window.jQuery = window.$ = $
require('bootstrap/dist/js/bootstrap.min.js')
Vue.use(ElementUI)
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
