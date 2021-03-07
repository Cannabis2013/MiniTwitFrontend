import TextBox from "../textbox/index.vue"
export default {
  name: 'linktextbox',
  components: {
    TextBox
  },
  props: [
    "text",
    "fontSize",
    "fontColor",
    "backgroundColor",
    "radius",
    "target"
  ],
  data () {
    return {

    }
  },
  computed: {
    getTarget : function()
    {
      let t = this.target;
      if(t === undefined)
        return "/";
      else
        return t;
    }
  },
  mounted () {

  },
  methods: {

  }
}


