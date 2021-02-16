import ActiveButton from "../activebuttoncomponent/index.vue"
import axios from "axios";

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
          .then(response => this.handleResponse(response.data))
          .catch(response => this.handleResponse(response.data));
    },
    handleResponse : function (response)
    {
      this.$cookies.remove("UserName");
      this.$cookies.remove("TokenId");
      this.$router.push("/");
      console.log("handleResponse: " +  response);
    }
  },
  mounted () {
    this.userName = this.$cookies.get("UserName");
    this.IPAddress = this.$cookies.get("LocalAddress");

  },
  methods: {
    
  }
}


