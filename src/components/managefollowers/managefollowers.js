import axios from "axios";
import {EventBus} from "@/eventBus";

export default {
  name: 'managefollowers',
  components: {},
  props: [],
  data() {
    return {
      followers : []
    };
  },
  computed: {

  },
  mounted () {
    this.requestFollowersFromBackend();
  },
  methods: {
    requestFollowersFromBackend : function()
    {
      axios({
        method : "get",
        url : this.apiHostUrl + "GetFollowers",
        params : {
          tokenId : this.$cookies.get("TokenId"),
          tokenAddress : this.$cookies.get("TokenAddress")
        }
      })
          .then(response => {
            if(response.responseCode === 1)
            {
              console.log("Backend responded with code: " + response.responseCode);
              EventBus.$emit("UserSignOut",false);
              return;
            }
            this.followers = response.data.payLoad;
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
        this.requestFollowersFromBackend();
      }).catch(response => console.log(response));
    }
  }
}


