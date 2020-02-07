import Vue from 'vue'
import App from './App.vue'
import serverRequest from './api'

Vue.config.productionTip = false
Vue.prototype.serverRequest = serverRequest

new Vue({
  render: h => h(App),
}).$mount('#app')
