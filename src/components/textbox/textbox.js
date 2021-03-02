
export default {
  name: 'textbox',
  components: {},
  props: [
      "text",
      "fontSize",
      "fontColor",
      "backgroundColor",
      "radius"
  ],
  data () {
    return {

    }
  },
  computed: {
      getFontSize : function()
      {
          let fSize = this.fontSize;
          if(this.isNotDefined(fSize))
              return "12pt";
          else
              return fSize;
      },
      getFontColor : function()
      {
          let fColor = this.fontColor;
          if(this.isNotDefined(fColor))
              return "white";
          else
              return fColor;
      },
      getBackgroundColor : function()
      {
          let bColor = this.backgroundColor;
          if(this.isNotDefined(bColor))
              return "black";
          else
              return bColor;
      },
      getRadius : function()
      {
          let r = this.radius;
          if(this.isNotDefined(r))
              return "0px";
          else
              return r;
      },
      getText : function()
      {
          let t = this.text;
          if(this.isNotDefined(t))
              return "Text";
          else
              return t;
      }
  },
  mounted () {

  },
  methods: {
      isNotDefined : function(variable)
      {
          return variable === undefined;
      }
  }
}


