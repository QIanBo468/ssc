import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './utils/rem.js'
import api from './utils/api'

Vue.prototype.$axios = api
Vue.use(VueAxios, axios)

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
