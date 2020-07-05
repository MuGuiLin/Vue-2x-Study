<template>
  <section>
    <h1>自定义Alert组件</h1>
    <button type="button" @click="open">弹出Alert组件</button>
  </section>
</template>

<script>
import Create from "@/utils/alert";
import Notice from "@/components/Notice";

export default {
  name: "Alert",
  components: {},
  data() {
    return {};
  },
  methods: {
    open() {
      Create(Notice, {
        title: "提示信息",
        message: "我是提示内容!",
        time: 3000
      }).show();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>