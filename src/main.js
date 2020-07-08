import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import store from './muStore' // 自己实现的vuex
import './plugins/element.js'

// import Bus from './utils/bus';

Vue.config.productionTip = false

// 全局挂载 总件总线 event bus, 在实践中通常⽤Vue代替Bus.js，因为Vue已经实现了相应接⼝
// Vue.prototype.$bus = new Bus()
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
