<template src="./main.html"></template>
<script>
import MyHeaderComponent from "./components/headercomponent/index.vue"
import axios from "axios";

export default {
  name: 'App',
  data() {
    return {
      handleRecieveAddress : function(response)
      {
        this.$cookies.set("localAddress",response.ip);
      }
      
    }
  },
  components: {
    MyHeaderComponent
  },
  mounted() {
    
    axios({
      method : "get",
      url : "http://ipinfo.io/json"
    })
        .then(response => this.handleRecieveAddress(response.data))
        .catch();
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
