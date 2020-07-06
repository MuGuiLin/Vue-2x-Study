<template>
  <section class="slot">
    <div class="box">
      <h3>我是匿名插槽：Comp1</h3>

      <!-- 匿名插槽 -->
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "Comp1"
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