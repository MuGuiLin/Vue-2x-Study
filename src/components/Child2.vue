<template>
  <section class="child">
    <h2>我是子组件2(Child2)</h2>
    <p>{{proMsg}}</p>
    <input type="text" v-model="text" />
    <button @click="sendChild1">给child1发送消息</button>
  </section>
</template>

<script>
export default {
  name: "Child2",
  props: {
    proMsg: String
  },
  data() {
    return {
      text: ""
    };
  },
  mounted() {},
  methods: {
    sendChild1() {
      // 用$bus 事件总线 来中做中间件派发事件
      // this.$bus.$emit("mupiao", this.text);

      // 用$parent 来中做中间件派发事件
      // this.$parent.$emit("mupiao", this.text);
      
      // 用$root 来中做中间件派发事件
      this.$root.$emit("mupiao", this.text);
    }
  }
};
</script>

<style lang="scss" >
.child {
  display: inline-block;
  margin: 30px;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 8px;
}
</style>