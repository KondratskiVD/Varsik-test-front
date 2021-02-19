import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

import axios from './axios/index.js'
Vue.prototype.$http = axios

import './filters/index'
import './assets/css/style.css'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import store from './store/index'

import VueSkeletonLoader from 'skeleton-loader-vue';
Vue.component('vue-skeleton-loader', VueSkeletonLoader);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
