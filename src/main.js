import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Start from "./components/startComponent/index.vue"
import SignUp from "./components/signupcomponent/index.vue"
import SignIn from "./components/signincomponent/index.vue"
import VueCookies from 'vue-cookies'


Vue.use(VueRouter)
Vue.use(VueCookies)


const routes = [
  { 
    path: '/', component: Start
  },
  {
    path: '/signUp', component: SignUp
  },
  {
    path: '/signIn', component: SignIn
  }
]

export const router = new VueRouter({
  base: '/',
  routes
});

Vue.$cookies.config('7d')

Vue.$cookies.set('theme','default');
Vue.$cookies.set('hover-time','1s');

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
