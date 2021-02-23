
import MessageModel from "../messagemodel/index.vue"
import CreatePost from "../createpost/index.vue"
import axios from "axios";
import {EventBus} from "@/eventBus";

export default {
  name: 'signedinmessagescomponent',
  components: {
    MessageModel,
    CreatePost
  },
  props: [],
  data () {
    return {
      messages: []
    }
  },
  computed: {

  },
  mounted () {
    var tokenId = this.$cookies.get("TokenId");
    if(tokenId === null)
      this.$router.push("/");
    this.requestMessagesFromBackend();
    
  },
  methods: {
    requestMessagesFromBackend : function()
    {
      axios({
        method : "get",
        url : this.apiHostUrl + "GetAssociatedMessages",
        params : {
          tokenId : this.$cookies.get("TokenId"),
          tokenAddress : this.$cookies.get("LocalAddress")
        }
      }).then(response => this.handleResponseFromBackend(response.data))
          .catch(response => console.log(response));
    },
    handleResponseFromBackend : function(response)
    {
      if(response.responseCode === 1)
      {
        // Backend signals that user is not signed in
        this.$cookies.remove("TokenId");
        this.$cookies.remove("UserName");
        EventBus.$emit("UserStatusChanged",false);
        this.$router.push("/");
        return;
      }
      console.log(response);
      
      this.messages = response.payLoad;
      console.log(this.messages);
    },
    handleClickEvent : function()
    {
      console.log("Called");
      this.requestMessagesFromBackend();
    }
  }
}


