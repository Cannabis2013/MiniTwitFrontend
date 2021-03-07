import axios from "axios";
import MessageModel from "../message/index.vue"

export default {
  name: 'deletemessages',
  components: {
    MessageModel
  },
  props: [],
  data () {
    return {
      messages : []
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    requestMessages : function()
    {
      axios({
        method: "get",
        url: this.apiHostUrl + "GetUserMessages",
        header: "application/json",
        params: {
          tokenId : this.$cookies.get("TokenId"),
          tokenAddress : this.$cookies.get("LocalAddress")
        }
      }).then(response => this.handleResponse(response)).
      catch(response => console.log(response.data()));
    },
    handleResponse : function(response)
    {
      this.messages = response;
    }
  }
}


