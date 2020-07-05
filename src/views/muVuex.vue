<template>
  <section>
    <h1>手写Vuex状态管理</h1>
    <pre></pre>
    <button
      type="button"
      @click="$store.commit('add', '同步')"
    >$store.commit()同步(立即更新) numSum {{$store.state.numSum}}</button>
    <button
      type="button"
      @click="$store.commit('cut', '同步')"
    >$store.commit()同步(立即更新) numSum {{$store.state.numSum}}</button>

    <button
      type="button"
      @click="$store.commit('add', '同步')"
    >$store.commit() 加 {{$store.state.numSum}}</button>
    <button
      type="button"
      @click="$store.commit('cut', '同步')"
    >$store.commit() 减 {{$store.state.numSum}}</button>

    <button
      type="button"
      @click="$store.dispatch('add', '异步')"
    >$store.dispatch()异步 async numSum {{$store.state.numSum}}</button>
    <button
      type="button"
      @click="$store.dispatch('cut', '异步')"
    >$store.dispatch()异步 async numSum {{$store.state.numSum}}</button>

  <h1>getters doubleNumSum: {{'$store.getters.doubleNumSum($store.state)'}}</h1>

  </section>

</template>

<script>
// import Store from "../store/index";

export default {
  name: "muVuex",
  components: {},
  data() {
    return {};
  },
  mounted() {
    // console.log(Store.mupiao = 666);
    // console.log(Store);

    // console.log(
    //   "*************************",
    //   this.$store,
    //   this.$store.state.numSum
    // );

    console.log(this.$store.getters.doubleNumSum(this.$store.state))
  },
  methods: {
    open() {}
  }
};
</script>

<style lang="scss" scoped>
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>