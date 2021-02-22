import ActiveButton from "../linkbutton/index.vue"
import UserInformation from "../userinformation/index.vue"

export default {
  name: 'header-nav-bar',
  components: {
    ActiveButton,
    UserInformation
  },
  props: [
      
  ],
  data()  {
    return {
      userLoggedIn : false,
    }
  },
  computed: {
  },
  created() {
  },
  mounted () {
    if(this.$cookies.get("TokenId") !== null)
    {
      this.userLoggedIn = true;
      console.log("Something is wrong!");
    }
  },
  methods: {
    
  }
}


