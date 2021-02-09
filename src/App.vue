<template src="./main.html"></template>

<script>
import MyHeaderComponent from "./components/headercomponent/index.vue"
export default {
  name: 'App',
  components: {
    MyHeaderComponent
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
