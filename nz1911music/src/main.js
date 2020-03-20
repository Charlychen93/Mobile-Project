import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './style/reset.css'
import 'animate.css/animate.css'
import router from './router'
import axios from './utils/axios'
import VueLazyload from 'vue-lazyload'

import MintUI from 'mint-ui';

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '/favicon.ico',
    loading: '/favicon.ico',
    attempt: 1
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')