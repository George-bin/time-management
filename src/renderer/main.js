import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import './assets/style/init.css'
import './assets/style/iconfont/iconfont.css'
import moment from 'moment' // 导入文件
Vue.prototype.$moment = moment // 赋值使用
moment.locale('zh-cn') // 需要汉化

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
