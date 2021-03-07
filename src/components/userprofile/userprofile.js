import ProfileLinkBar from "../profilelinkbar/index.vue"
import LinkButton from "@/components/linkbutton";

export default {
  name: 'userprofile',
  components: {
    ProfileLinkBar,
    LinkButton
  },
  props: [
      "linkFontSize"
  ],
  data () {
    return {
    }
  },
  computed: {
    getLinkFontSize : function()
    {
      let lfs = this.linkFontSize;
      if(lfs === undefined)
        return "24pt";
      else
        return lfs;
    }
  },
  mounted () {

  },
  methods: {

  }
}


