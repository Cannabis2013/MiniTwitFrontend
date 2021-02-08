import NavItem from "../headerNavigationItem/index.vue"
import Axios from "axios";

const apiHostUrl = "https://localhost:5001/MiniTwitIndex/";

export default {
  name: 'header-nav-bar',
  components: {
    NavItem
  },
  props: [
      
  ],
  data()  {
    return {
      /*
        API user status codes:
          - Not logged in: 1
          - Logged in: 2
       */
      userStatus : 1
    }
  },
  computed: {
  },
  created() {
  },
  mounted () {
    const url = apiHostUrl + "UserStatus";
    Axios.get(url)
        .then(response => this.userStatus = response.data)
        .catch(response => console.log(response));
  },
  methods: {
    
  }
}


