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
      messages: [],
      metaInfo: {},
      userName: ""
    }
  },
  computed: {
    formatNumberOfFollowers : function()
    {
      let c = this.metaInfo.numberOfFollowers;
      if(c >= 25)
        return c + " (Wiseguy)"
      else if(c >= 10)
      return c + " (Go get some more friends)"
      else
        return c + " (Loser)";
    }
  },
  mounted () {
    if(this.$cookies.get("TokenId") === null)
      this.$router.push("/");
    this.userName = this.$cookies.get("UserName");
    this.requestMessagesFromBackend();
    EventBus.$on("requestDeleteMessage", id => this.deleteMessage(id))
    
  },
  methods: {
    requestMessagesFromBackend : function()
    {
      axios({
        method : "get",
        url : this.apiHostUrl + "GetAssociatedMessages",
        params : {
          tokenId : this.$cookies.get("TokenId"),
          tokenAddress : this.$cookies.get("TokenAddress")
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
      this.metaInfo = response.userMeta;
      console.log(this.messages);
    },
    handleNoResponseFromBackend : function(response)
    {
      console.log(response);
      EventBus.$emit("UserSignOut",response);
    },
    handleClickEvent : function()
    {
      this.requestMessagesFromBackend();
    },
    deleteMessage : function(msg_id)
    {
      console.log("Delete message with id: " + msg_id);
      axios({
        method: "post",
        url: this.apiHostUrl + "DeleteMessage",
        params : {
          tokenId : this.$cookies.get("TokenId"),
          tokenAddress : this.$cookies.get("TokenAddress"),
          messageId : msg_id
        }
      }).then(response => this.handleDeleteMessageResponse(response.data));
    },
    handleDeleteMessageResponse : function(response)
    {
      console.log(response);
      let r = response.responseCode;
      // Check backend response
      if(r === 259)
        this.requestMessagesFromBackend();
    },
    handleFollowUser : function(userName)
    {
      console.log("Username to follow: " + userName);
      axios({
        method : "post",
        url : this.apiHostUrl + "FollowUser",
        params : {
          tokenId : this.$cookies.get("TokenId"),
          tokenAddress : this.$cookies.get("TokenAddress"),
          name : userName
        }
      }).then(response => this.handleFollowUserResponse(response.data))
          .catch(response => console.log(response));
    },
    handleFollowUserResponse : function(response)
    {
      console.log(response);
      this.requestMessagesFromBackend();
    },
    handleUnFollowUser : function(userName)
    {
      console.log("Username to unfollow: " + userName);
      axios({
        method : "post",
        url : this.apiHostUrl + "UnFollowUser",
        params : {
          tokenId : this.$cookies.get("TokenId"),
          tokenAddress : this.$cookies.get("TokenAddress"),
          name : userName
        }
      }).then(response => this.handleUnFollowUserResponse(response.data))
          .catch(response => console.log(response));
    },
    handleUnFollowUserResponse : function(response)
    {
      console.log(response);
      this.requestMessagesFromBackend();
    }
  }
}