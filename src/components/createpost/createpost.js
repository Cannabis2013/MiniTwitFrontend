import axios from "axios";
import {EventBus} from "@/eventBus";

export default {
  name: 'createpost',
  components: {},
  props: [],
  data () {
    return {
      userText : "",
      isTransmitting : false
    }
  },
  computed: {
    
  },
  mounted () {

  },
  methods: {
    handleShare : function ()
    {
      this.isTransmitting = true;
      const tId = this.$cookies.get("TokenId");
      const localAddress = this.$cookies.get("LocalAddress");
      axios({
        method : "post",
        url : this.apiHostUrl + "PostMessage",
        params : {
          tokenId : tId,
          tokenAddress : localAddress,
          text : this.userText
        }
      })
          .then(response => this.handleResponse(response.data))
          .catch(response => console.log(response));
    },
    handleResponse : function(response)
    {
      console.log(response);
      this.isTransmitting = false;
      if(response["responseCode"] === 1)
      {
        // Backend signals that user is not signed in
        this.$cookies.remove("TokenId");
        this.$cookies.remove("UserName");
        EventBus.$emit("UserStatusChanged",false);
        this.$router.push("/");
        return 0;
      }
      else if(response["responseCode"] === 256)
      {
        this.userText = "";
        this.$emit("click");
      }
    }
  }
}


