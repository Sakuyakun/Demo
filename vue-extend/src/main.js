import Vue from 'vue'
import App from './App.vue'

import alert from './components/alert'

Vue.config.productionTip = false
Vue.prototype.$alert = alert

new Vue({
  render: h => h(App),
}).$mount('#app')
