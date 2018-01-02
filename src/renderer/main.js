import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

// import './proxy.js'

import db from './datastore'

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = db

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

// イベント用のvueオブジェクトを作る
Vue.prototype.$eventCaller = new Vue()
