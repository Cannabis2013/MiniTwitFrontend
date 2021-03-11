import axios from "axios";
import {EventBus} from "@/eventBus";
import Message from "../message/index.vue"
export default {
  name: 'managemessages',
  components: {
    Message
  },
  props: [],
  data() {
    return {
      messages : []
    };
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
        url : this.apiHostUrl + "GetUserMessages",
        params : {
          tokenId : this.$cookies.get("TokenId"),
          tokenAddress : this.$cookies.get("TokenAddress")
        }
      })
          .then(data => {
            let response = data.data;
            if(response["responseCode"] === 1)
            {
              console.log("Backend responded with code: " + response.responseCode);
              EventBus.$emit("UserSignOut",false);
              return;
            }
            this.messages = response["payLoad"];
            console.log(response);
          })
          .catch(response => {
            console.log(response);
            EventBus.$emit("UserSignOut",false);
          });
    },
    handleClickEvent : function(un)
    {
      console.log(un);
      axios({
        method : "post",
        url : this.apiHostUrl + "UnFollowUser",
        params : {
          tokenId : this.$cookies.get("TokenId"),
          tokenAddress : this.$cookies.get("TokenAddress"),
          whomid : un
        }
      }).then(response => {
        console.log(response);
        this.requestMessagesFromBackend();
      }).catch(response => console.log(response));
    }
  }
}


