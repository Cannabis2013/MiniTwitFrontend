import TextBox from "../textbox/index.vue"
import DropDownMenu from "../dropdownmenu/index.vue"
import CustomMenuItem from "../menuitem/index.vue"
import {EventBus} from "@/eventBus";

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
      "message_id"
  ],
  data () {
    return {
        isFollowing : false
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
          EventBus.$emit("requestDeleteMessage",this.message_id);
      }
  }
}