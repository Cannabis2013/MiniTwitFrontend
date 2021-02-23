import ActiveButton from "../linkbutton/index.vue"
import axios from "axios";
import {EventBus} from "@/eventBus";

const apiHostUrl = "https://localhost:5001/MiniTwitIndex/"

export default {
  name: 'userinformationcomponent',
  components: {
    ActiveButton
  },
  props: [
      
  ],
  data () {
    return {
      userName : "Martin Hansen",
      IPAddress : ""
    }
  },
  computed: {
    handleSignOutClicked : function()
    {
      console.log("handleSignOutClicked");
      axios({
        method : "post",
        url : apiHostUrl + "SignOutUser",
        params : {
          tokenId : this.$cookies.get("TokenId"),
          tokenAddress : this.$cookies.get("LocalAddress")
        }
      })
          .then(response => EventBus.$emit("UserSignOut",response))
          .catch(response => EventBus.$emit("UserSignOut",response));
    }
  },
  mounted () {
    this.userName = this.$cookies.get("UserName");
    this.IPAddress = this.$cookies.get("LocalAddress");

  },
  methods: {
    
  }
}


