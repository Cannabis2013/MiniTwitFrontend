
export default {
  name: 'header-navigation-item',
  components: {},
  props: [
      "backgroundColor",
      "imageUrl",
      "itemTitle",
      "target",
      "imageSize",
      "fontColor",
      "fontSize"
  ],
  data () {
    return {
    }
  },
  computed: {
      showImage : function()
      {
          let np = this.imageUrl;
          return np !== undefined;
      },
      getImageSize : function()
      {
          let sz = this.imageSize;
          if(sz === undefined)
              return "48px";
          else
              return sz;
      },
      getBackgroundColor : function()
      {
          let bc = this.backgroundColor;
          return bc !== undefined ? bc : "transparent";
      }
      ,
      getFontColor : function()
      {
          let fc = this.fontColor;
          return fc !== undefined ? fc : "white";
      },
      getFontSize : function()
      {
          let fs = this.fontSize;
          return fs !== undefined ? fs : "15pt";
      }
  },
  mounted () {
  },
  methods: {

  }
}


