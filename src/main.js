import Vue from 'vue'
// import App from './App.vue'
import Test from './Test.vue'

Vue.config.productionTip = false
window.onerror = function(){
  location.reload()
}
new Vue({
  render: h => h(Test),
}).$mount('#app')
