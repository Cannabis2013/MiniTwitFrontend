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
      DropDownAssembly.createFrame().onmousedown = this.menuLostFocus;
      DropDownAssembly.showDropDownMenu(this._uid);
    },
    menuLostFocus : function()
    {
      DropDownAssembly.removeFrame();
      DropDownAssembly.hideDropDownMenu(this._uid);
      console.log("blue event occured")
      this.isDropDownMenuShown = false;
    }
  }
}


