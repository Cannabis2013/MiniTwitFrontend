import axios from "axios";
import {EventBus} from "@/eventBus";

export default {
  name: 'createpost',
  components: {},
  props: [],
  data () {
    return {
        userText : "",
        fontFamily : "Helvetica, sans-serif;",
        fontSize : "17pt",
        isTransmitting : false,
        selectedAccessMode : "4",
        fonts : [
            "Arial, sans-serif",
            "Helvetica, sans-serif",
            "Gill Sans, sans-serif",
            "Lucida, sans-serif",
            "Helvetica Narrow, sans-serif",
            "sans-serif",
            "system-ui",
            "Helvetica, sans-serif;",
            "Arial",
            "Sans Serif",
            "Open Sans",
            "Times, serif",
            "Times New Roman",
            "Palatino, serif",
            "Bookman, serif",
            "New Century Schoolbook, serif",
            "serif"
        ]
    }
  },
  computed: {
    computePointSizes : function(){
        let pSizes = [];
        for (let i = 1; i < 32; i++)
            pSizes.push(i + "pt");
        for(let i = 32;i <64;i += 4)
            pSizes.push(i + "pt");
        for(let i = 64;i <=128;i += 16)
            pSizes.push(i + "pt");
        return pSizes;
    }
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
            Access : this.selectedAccessMode,
            fontFamily : this.fontFamily,
            fontSize : this.fontSize
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