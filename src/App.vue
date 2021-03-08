<template src="./main.html"></template>
<script>
import MyHeaderComponent from "./components/header/index.vue"
import axios from "axios";

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    MyHeaderComponent
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
      this.$cookies.set(" ",response.ip);
    },
    handleNoResponse : function(response)
    {
      console.log(response);
      this.$cookies.set("TokenAddress","0.0.0.0");
    }
  }
}
</script>

<style src="./globalstyle/global.css" scoped lang="css" type="text/css"></style>

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
