import axios from "axios";
import {EventBus} from "@/eventBus";

export default {
  name: 'createpost',
  components: {},
  props: [],
  data () {
    return {
      userText : "",
      isTransmitting : false,
      selectedAccessMode : "4"
    }
  },
  computed: {
    
  },
  mounted () {

  },
  methods: {
    handleShare : function ()
    {
        if(this.userText === "")
            return;
        this.isTransmitting = true;
        const tId = this.$cookies.get("TokenId");
        const TokenAddress = this.$cookies.get("TokenAddress");
        axios({
        method : "post",
        header : "application/json",
        url : this.apiHostUrl + "PostMessage",
        data : {
            TokenId : tId,
            TokenAddress : TokenAddress,
            Text : this.userText,
            Access : this.selectedAccessMode
        }
        }).then(response => {
            let payLoad = response.data;
            console.log(payLoad);
            this.isTransmitting = false;
            if(payLoad["responseCode"] === 1)
            {
              // Backend signals that user is not signed in
              this.$cookies.remove("TokenId");
              this.$cookies.remove("UserName");
              EventBus.$emit("UserStatusChanged",false);
              this.$router.push("/");
              return 0;
            }
            else if(payLoad["responseCode"] === 256)
            {
              this.userText = "";
              this.$emit("click");
            }
          })
          .catch(response => console.log(response));
    }
  }
}