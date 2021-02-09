import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Start from "./components/startComponent/index.vue"
import SignUp from "./components/signupcomponent/index.vue"

Vue.use(VueRouter)

const routes = [
  { 
    path: '/', component: Start
  },
  {
    path: '/signUp', component: SignUp
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
