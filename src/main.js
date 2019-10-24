// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import axios from 'axios'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
// import VeeValidate, { Validator } from 'vee-validate'
// import zh from 'vee-validate/dist/locale/zh_CN'
// Vue.use(axios)
Vue.use(Vant)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
