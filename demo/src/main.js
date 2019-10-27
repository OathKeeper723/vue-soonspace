import Vue from 'vue'
import App from './App.vue'
import vs from 'vue-soonspace'

Vue.config.productionTip = false

Vue.use(vs)

new Vue({
  render: h => h(App),
}).$mount('#app')
