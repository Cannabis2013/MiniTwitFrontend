import ActiveButton from "../activebuttoncomponent/index.vue"
import UserInformation from "../userinformationcomponent/index.vue"

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
    if(this.$cookies.get("tokenId") !== null)
    {
      this.userLoggedIn = true;
      console.log("Something is wrong!");
    }
  },
  methods: {
    
  }
}


