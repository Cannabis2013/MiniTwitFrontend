import TextBox from "../textbox/index.vue"
import DropDownMenu from "../dropdownmenu/index.vue"
import CustomMenuItem from "../menuitem/index.vue"
import axios from "axios";

export default {
  name: 'messagecomponent',
  components: {
      TextBox,
      DropDownMenu,
      CustomMenuItem
  },
  props: [
      "author_name",
      "text",
      "pub_date",
      "author_id",
      "pub_time",
      "access",
      "message_id",
      "isFollowing"
  ],
  data () {
    return {
    }
  },
  computed: {
      formattedText : function()
      {
          let t = this.text !== null ? this.text : "";
          console.log(t);
          t = t.replaceAll("\n","<br>");
          return t;
      },
      translatedAccessMode : function()
      {
          if(this.access === 2)
              return "Public";
          else if(this.access === 4)
              return "Friends-only";
          else if(this.access === 8)
              return "Private";
      }
  },
  mounted () {

  },
  methods: {
      isUsersOwnPost : function(author_id)
      {
          let id = this.$cookies.get("TokenId");
          return author_id === id;
      },
      handleDeleteMessage : function()
      {
          this.$refs.menu.menuLostFocus();
          let msg_id = this.message_id;
          console.log("Delete message with id: " + msg_id);
          axios({
              method: "post",
              url: this.apiHostUrl + "DeleteMessage",
              params : {
                  tokenId : this.$cookies.get("TokenId"),
                  tokenAddress : this.$cookies.get("TokenAddress"),
                  messageId : msg_id
              }
          }).then(data => {
              let response = data.data;
              console.log(response);
              let r = response.responseCode;
              // Check backend response
              if(r === 259)
                  this.$emit("stateChange");
          }).catch(response => console.log(response));
      },
      handleFollowUser : function()
      {
          console.log("Follow user called!");
          this.$refs.menu.menuLostFocus();
          let userId = this.author_id;
          console.log("Username to follow: " + userId);
          axios({
              method : "post",
              url : this.apiHostUrl + "FollowUser",
              params : {
                  tokenId : this.$cookies.get("TokenId"),
                  tokenAddress : this.$cookies.get("TokenAddress"),
                  whomid : userId
              }
          }).then(response => {
              console.log(response);
              this.$emit("stateChange");
          });
      },
      handleUnFollowUser : function()
      {
          console.log("Unfollow user called!");
          this.$refs.menu.menuLostFocus();
          let userId = this.author_id;
          console.log("Username to unfollow: " + userId);
          axios({
              method : "post",
              url : this.apiHostUrl + "UnFollowUser",
              params : {
                  tokenId : this.$cookies.get("TokenId"),
                  tokenAddress : this.$cookies.get("TokenAddress"),
                  whomid : userId
              }
          }).then(response => {
              console.log(response);
              this.$emit("stateChange");
          });
      },
      handleReportPost : function()
      {
          console.log("Report called!");
          this.$refs.menu.menuLostFocus();
      }
  }
}