<template>
  <nav class="nav">
    <router-link v-for="(o, i) in navs" :key="i" :to="o.path">{{o.name}}</router-link>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      navs: [
        { path: "/", icon: "", name: "Home" },
        { path: "/about", icon: "", name: "About" },
        { path: "/vueapi", icon: "", name: "Vueapi" },
        { path: "/components", icon: "", name: "Components" },
        { path: "/element", icon: "", name: "Element" },
        { path: "/form", icon: "", name: "Form" },
        { path: "/alert", icon: "", name: "Alert" },
        { path: "/router", icon: "", name: "Router" },
        { path: "/vuex", icon: "", name: "Vuex" },
        { path: "/muvuex", icon: "", name: "muVuex" }
      ]
    };
  }
};
</script>

<style lang="scss" >
.nav {
  padding: 30px;
  a {
    padding: 20px;
    color: #2c3e50;
  }

  a.router-link-exact-active {
    color: #42b983;
    font-weight: bold;
  }
}
</style>