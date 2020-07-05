<template>
  <section>
    <h1>Vuex状态管理</h1>
    <pre>
      安装：vue add vuex 或 npm i vuex

      核心概念：vuex 依赖于 vue, 因为vuex用到了vue的数据响应适

      // store容器
      Store: {
        state:{},     //状态 数据存储
        mutations:{}, //突变 更改状态的函数
        actions:{},   //行动 异步操作如 ajax
        modules: {},  //模组 模块化
        getters:{}    //吸气剂（相当于store的计算属性）getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
      }
    </pre>
    <button type="button" @click="open">弹出Alert组件</button>
  </section>
</template>

<script>

import Store from "../store/index";

export default {
  name: "Vuex",
  components: {},
  data() {
    return {};
  },
  mounted() {
    console.log(Store.mupiao = 666);
    console.log(Store);
  },
  methods: {
    open() {
     
    }
  }
};
</script>

<style lang="scss" scoped>
</style>