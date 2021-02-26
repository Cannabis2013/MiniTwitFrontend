
import MessageModel from "../message/index.vue"
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
    if(this.$cookies.get("TokenId") === null)
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
          .catch(response => this.handleNoResponseFromBackend(response));
    },
    handleResponseFromBackend : function(response)
    {
      if(response.responseCode === 1)
      {
        // Backend signals that user is not signed in
        EventBus.$emit("UserSignOut",response);
        return;
      }
      console.log(response);
      
      this.messages = response.payLoad;
      console.log(this.messages);
    },
    handleNoResponseFromBackend : function(response)
    {
      console.log(response);
      EventBus.$emit("UserSignOut",response);
    },
    handleClickEvent : function()
    {
      console.log("Called");
      this.requestMessagesFromBackend();
    }
  }
}


