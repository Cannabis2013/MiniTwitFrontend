import DropDownAssembly from "./assembledropdown.js"

export default {
  name: 'dropdownmenu',
  components: {
  },
  props: [],
  data () {
    return {
      isDropDownMenuShown : false
    }
  },
  computed: {
  },
  mounted () {
    
  },
  methods: {
    showDropDown : function()
    {
      DropDownAssembly.createFrame().onclick = this.menuLostFocus;
      DropDownAssembly.showDropDownMenu(this._uid);
    },
    menuLostFocus : function()
    {
      console.log("Frame clicked");
      DropDownAssembly.removeFrame();
      DropDownAssembly.hideDropDownMenu(this._uid);
      this.isDropDownMenuShown = false;
    }
  }
}


