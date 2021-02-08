import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import StartComponent from "./components/startComponent/index.vue"

Vue.use(VueRouter)

const routes = [
  { 
    path: '/', component: StartComponent
  }
]

export const router = new VueRouter({
  base: '/',
  routes
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
