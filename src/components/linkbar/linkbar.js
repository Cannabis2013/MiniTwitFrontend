import ActiveButton from "../linkbutton/index.vue";
import {EventBus} from "@/eventBus";

export default {
  name: 'linkbarcomponent',
  components: {
    ActiveButton
  },
  props: [],
  data () {
    return {
      userSignedIn : false
    }
  },
  computed: {

  },
  mounted () {
    this.userSignedIn = this.isUserSignedIn();
    EventBus.$on("UserStatusChanged",arg => this.userSignedIn = arg);
  },
  methods: {
    isUserSignedIn : function()
    {
      let un = this.$cookies.get("TokenId");
      console.log(un);
      return un !== null;
    }
  }
}


