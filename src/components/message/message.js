
export default {
  name: 'messagecomponent',
  components: {},
  props: [
      "author_name",
      "text",
      "pub_date",
      "pub_time",
      "access",
      "isUsersOwnPost"
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
      
  }
}


