
import MessageModel from "../messagemodel/index.vue"
import CreatePost from "../createpost/index.vue"
import axios from "axios";

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
        this.$cookies.remove("TokenId");
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


