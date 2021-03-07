import LoginBar from "../loginbar/index.vue"
import UserInformation from "../userinfopanel/index.vue"
import {EventBus} from "@/eventBus";
import LinkBar from "../linkbar/index.vue"


export default {
  name: 'headercomponent',
  components: {
    LoginBar,
    UserInformation,
    LinkBar
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


