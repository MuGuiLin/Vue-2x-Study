<template>
  <div id="app">
    <Nav></Nav>
    <hr />
    <div class="main">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  name: "App",
  components: {
    Nav
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .main{
    width: 1280px;
    margin: auto;
  }
}
</style>
