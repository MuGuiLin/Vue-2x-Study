<template>
  <section class="slot">
    <h1>插槽</h1>
    <p>插槽语法是Vue 实现的内容分发 API，⽤于复合组件开发。该技术在通⽤组件库开发中有⼤量应⽤。</p>
  </section>
</template>

<script>
export default {
  name: "Slots",
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
.slot {
  .pre {
    padding: 50px;
    text-align: left;
    font-size: 18px;
    line-height: 32px;
    code {
      display: inline-block;
      padding-right: 30px;
      color: white;
      background: #333;
      font-size: 16px;
      line-height: 28px;
      border-radius: 8px;
    }
    b {
      display: inline-block;
      margin-top: 30px;
    }
  }
}
</style>