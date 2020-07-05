<template>
  <section class="child">
    <h2>我是子组件3(Child3)</h2>

    <!-- 直接使用$attrs中的数据 -->
    <p>{{$attrs.proMsg}}</p>

    <!-- 使用inject -->
    <p>{{bar1}}，{{msg}}</p>

    <input type="text" v-model="text" />
    <button @click="sendData">调用祖先组件的方法</button>
  </section>
</template>

<script>
export default {
  name: "Child3",
  props: {},
  // inject: ["bar", "msg"], // 如果inject里面的命名当前组件中的属性有重名时，像下面用对象来起别名和设置默认值
  inject: {
    // bar1: "bar",
    bar1: {
      from: "bar",
      default: "我是默认值"
    },
    msg: "msg"
  },
  data() {
    return {
      bar: 666,
      text: ""
    };
  },
  mounted() {
    console.log("Child3", this.$parent, this.$attrs, this.$listeners);
  },
  methods: {
    sendData() {
      this.$listeners.myEvent(this.text);
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