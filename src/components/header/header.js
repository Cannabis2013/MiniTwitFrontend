import LoginBar from "../loginbar/index.vue"
import UserInformation from "../userinformation/index.vue"
import {EventBus} from "@/eventBus";



export default {
  name: 'headercomponent',
  components: {
    LoginBar,
    UserInformation
  },
  props: [],
  data () {
    return {
      userLoggedIn : false
    }
  },
  computed: {
  },
  mounted() {
    if(this.$cookies.get("TokenId") !== null)
        this.userLoggedIn = true;

    EventBus.$on("UserStatusChanged",arg => this.userLoggedIn = arg);
  },
  methods: {
  }
}


