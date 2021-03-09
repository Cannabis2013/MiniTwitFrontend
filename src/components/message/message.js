import TextBox from "../textbox/index.vue"
import DropDownMenu from "../dropdownmenu/index.vue"
import CustomMenuItem from "../menuitem/index.vue"

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
      handleRequestDeleteMessage : function()
      {
          console.log("Delete called!");
          this.$refs.menu.menuLostFocus();
          // Parent in this context is "usermessages" component
          this.$parent.deleteMessage(this.message_id);
      },
      handleFollowUser : function()
      {
          console.log("Follow user called!");
          this.$refs.menu.menuLostFocus();
          this.$parent.handleFollowUser(this.author_name);
      },
      handleUnFollowUser : function()
      {
          console.log("Unfollow user called!");
          this.$refs.menu.menuLostFocus();
          this.$parent.handleUnFollowUser(this.author_name);
      },
      handleReportPost : function()
      {
          console.log("Report called!");
          this.$refs.menu.menuLostFocus();
      }
  }
}