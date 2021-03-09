import DropDownAssembly from "./assembledropdown.js"
import {EventBus} from "@/eventBus";

export default {
  name: 'dropdownmenu',
  components: {
  },
  props: [],
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
    EventBus.$on(`MenuItemClicked`,this.menuLostFocus);
  },
  methods: {
    showDropDown : function()
    {
      DropDownAssembly.createFrame().onclick = this.menuLostFocus;
      DropDownAssembly.showDropDownMenu(this._uid);
    },
    menuLostFocus : function()
    {
      console.log("menuLostFocus called!");
      DropDownAssembly.removeFrame();
      DropDownAssembly.hideDropDownMenu(this._uid);
    }
  }
}


