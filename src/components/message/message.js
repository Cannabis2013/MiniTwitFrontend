
export default {
  name: 'messagecomponent',
  components: {},
  props: [
      "author_name",
      "text",
      "pub_date",
      "pub_time"
  ],
  data () {
    return {

    }
  },
  computed: {
      formattedText : function()
      {
          let t = this.text;
          t = t.replaceAll("\n","<br>");
          console.log(t);
          return t;
      }
  },
  mounted () {

  },
  methods: {
      
  }
}


