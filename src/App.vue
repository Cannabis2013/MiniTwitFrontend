<template src="./main.html"></template>
<script>
import MyHeaderComponent from "./components/header/index.vue"
import LinkBar from "./components/linkbar/index.vue"
import axios from "axios";

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    MyHeaderComponent,
    LinkBar
  },
  mounted() {
    axios({
      method : "get",
      url : "https://ipinfo.io/json"
    }).then(response => this.handleRecieveAddress(response.data))
        .catch(response => this.handleNoResponse(response));
  },
  methods: {
    handleRecieveAddress : function(response)
    {
      console.log(response["ip"]);
      this.$cookies.set("LocalAddress",response.ip);
    },
    handleNoResponse : function(response)
    {
      console.log(response);
      this.$cookies.set("LocalAddress","0.0.0.0");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body { margin: 0 !important; }
</style>
