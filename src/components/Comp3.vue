<template>
  <section class="slot">
    <div class="box">
      <h3>我是作用域插槽：v-slot: default</h3>

      <slot :user="user"></slot>
      <slot name="point" :fn='show'  ></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "Comp3",
  data() {
    return {
      user: {
        name: 'mupiao',
        age: 29,
        job: 'Web 全栈开发！'
      },
      isShow: true
    };
  },
  computed: {},
  mounted() {},
  methods: {
    show(){
      this.isShow = !this.isShow
    }
  }
};
</script>

<style lang="scss">
.slot {
  .box {
    display: inline-block;
    margin: 30px;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid gray;
  }
}
</style>