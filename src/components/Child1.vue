<template>
  <section class="child">
    <h2>我是子组件1(Child1)</h2>

    <p>props：{{proMsg}}</p>
    <p>$parent：{{$parent.msg}}</p>

    <p>{{text}}</p>
  </section>
</template>

<script>
export default {
  name: "Child1",
  props: {
    // proMsg: String,
    proMsg: {
      type: String,
      default: "父组件没传该值时，的默认值"
    }
  },
  data() {
    return {
        text: ''
    };
  },
  mounted() {
    console.log("直接获取父级组件的整个实例：", this.$parent);

    // Event Bus 监听Child2派发过来的事件
    // this.$bus.$on('mupiao', this.onChild2);
    // this.$bus.$on("mupiao", par => {
    //   this.text = par;
    //   console.log(par);
    // });

    // 用$parent 实现$bus
    // this.$parent.$on('mupiao', this.onChild2);
    // this.$bus.$on("mupiao", par => {
    //   this.text = par;
    //   console.log(par);
    // });

    // 用$root 实现$bus
    this.$root.$on('mupiao', this.onChild2);
    // this.$bus.$on("mupiao", par => {
    //   this.text = par;
    //   console.log(par);
    // });


  },
  methods: {
    sendData() {
      this.$emit("mu-event", "我是child1发送的消息！");
    },

    show(par) {
      console.log('这是父组件调用我时传来的参数：', par);
      return par + '------我是Child1组件！';
    },

    onChild2(par) {
      this.text = par;
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