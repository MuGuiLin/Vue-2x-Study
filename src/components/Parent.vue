<template>
  <section class="child">
    <h2>我是子组件2的父组件(Parent)</h2>
    <p>{{$attrs.proMsg}}</p>
    <!-- 属性展开：将父组件传过的数据 和 事件 用v-bind 和 v-on 直接传给子组件 -->
    <Child3 v-bind="$attrs" v-on="$listeners"></Child3>
  </section>
</template>

<script>
import Child3 from "./Child3";
export default {
  name: "Parent",
  components: {
    Child3
  },
  props: {},
  data() {
    return {};
  },
  mounted() {
    console.log("用 $attrs 获取父级组件传过来的数据：", this.$attrs);

    console.log("用 $listeners 获取父级组件传过来的事件：", this.$listeners);

    // 调用父组件传过来的事件
    // this.$listeners.myEvent('666');
  },
  methods: {}
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