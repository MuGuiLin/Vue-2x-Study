<template>
  <section>
    <h1>Vue常用组化件技术</h1>

    <nav class="nav">
      <router-link to="/components/communicate">组件通信方式</router-link>
      <router-link to="/components/slots">内容分发slot</router-link>
      <router-link to="/components/examples">组件实例</router-link>
      <router-link to="/components/Recursive">递归组件</router-link>
      <router-link to="/components/Function">函数式组件</router-link>
      <router-link to="/components/Mixins">混入mixins</router-link>
    </nav>

    <p class="p">vue组件系统提供了⼀种抽象，让我们可以使⽤独⽴可复⽤的组件来构建⼤型应⽤，任意类型的应⽤界⾯都可以抽象为⼀个组件树。组件化能提⾼开发效率，⽅便重复使⽤，简化调试步骤，提升项⽬可维护性，便于多⼈协同开发。</p>

    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: "Communicate",
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
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

.p{
  color: red;
  line-height: 36px;
  text-indent: 2em;
  text-align: left;
  font-size: 18px;
}
</style>