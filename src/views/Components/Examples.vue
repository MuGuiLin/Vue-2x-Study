<template>
  <section>
    <h1>组件实例创建 与 挂载 （组件构造函数 和 实例化）</h1>
    <button type="button" @click="open">弹出Alert组件</button>
  </section>
</template>

<script>

import Vuex, {mapState} from "vuex";

export default {
  name: "Examples",
  components: {},
  data() {
    return {};
  },
  computed: {
    // 映射 store里面 state 中的变量
    ...mapState( ['mupiao', 'logout'])  // 多个时

    // 通过 mapState, mapMutations, mapActions 的映射，可以减少直接对this.$store.xxx的访问
  },
  mounted() {
    console.log(Vuex, Vuex.Store.mupiao)
    console.log(this.mupiao)
  },
  methods: {
    open() {
 
    }
  }
};
</script>

<style lang="scss" scoped>
</style>