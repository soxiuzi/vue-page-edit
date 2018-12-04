import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/element.scss'
import './style/ant-design-vue.scss'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Antd)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
