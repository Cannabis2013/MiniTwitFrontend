import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
// Custom components
import Start from "./components/start/index.vue"
import SignUp from "./components/signup/index.vue"
import SignIn from "./components/signin/index.vue"
import UserMessages from "./components/usermessages/index.vue"
import UserProfilePage from "./components/userprofile/index.vue"
import DeleteMessagesPage from "./components/deletemessages/index.vue"

Vue.use(VueRouter)
Vue.use(VueCookies)

Vue.mixin({
  data: function() {
    return {
      get apiHostUrl() {
        return "https://localhost:5001/MiniTwitIndex/";
      }
    }
  }
})

const routes = [
  {
    path: '/', redirect: function()
    {
      // Redirect to appropriate page based on user signed in status
      const tokenId = Vue.$cookies.get("TokenId");
      if(tokenId === null)
        return "/home";
      else
        return '/userMessages';
    }
  },
  { 
    path: '/home', component: Start
  },
  {
    path: '/signUp', component: SignUp
  },
  {
    path: '/signIn', component: SignIn
  },
  {
    path: '/userMessages', component: UserMessages
  },
  {
    path: '/userProfile', component: UserProfilePage,
    children : [
      {
        path: 'deleteMessages', component: DeleteMessagesPage
      }
    ]
  }
]

export const router = new VueRouter({
  base: '/',
  routes
});

Vue.$cookies.config('7d')

Vue.$cookies.set('theme','default');
Vue.$cookies.set('hover-time','1s');

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
