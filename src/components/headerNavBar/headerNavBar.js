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
      userLoggedIn : false
    }
  },
  computed: {
  },
  created() {
  },
  mounted () {
    const url = apiHostUrl + "UserStatus";
    function handleResponse(response)
    {
      /*
        API response codes:
          - Not logged in: 1
          - Logged in: 2
       */
      this.userLoggedIn = response.data === 2;
    }
    Axios.get(url)
        .then(data => handleResponse(data))
        .catch(response => console.log(response));
  },
  methods: {
    
  }
}


