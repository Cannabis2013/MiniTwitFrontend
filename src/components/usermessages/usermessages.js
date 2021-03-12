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
      }).then(response => {
        let payLoad = response.data;
        if(payLoad.responseCode === 1)
        {
          // Backend signals that user is not signed in
          EventBus.$emit("UserSignOut",payLoad);
          return;
        }
        this.messages = payLoad.payLoad;
        this.metaInfo = payLoad.userMeta;
      })
          .catch(response => EventBus.$emit("UserSignOut",response));
    },
    handleClickEvent : function()
    {
      this.requestMessagesFromBackend();
    }
  }
}