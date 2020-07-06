<template>
  <section class="slot">
    <div class="box">
      <h3>我是匿名插槽：v-slot: default</h3>

      <!-- 匿名插槽 如父组件没有设置v-slot属性 或 v-slot: default时，默认在这里显示 -->
      <slot></slot>
    </div>

    <div class="box">
      <h3>我是具名插槽：v-slot:mySlot1</h3>

      <!-- 具名插槽 v-slot:mySlot1 -->
      <slot name="mySlot1"></slot>
    </div>

    <div class="box">
      <h3>我是具名插槽：v-slot:mySlot2</h3>

      <!-- 具名插槽 v-slot:mySlot2 -->
      <slot name="mySlot2"></slot>
    </div>

  </section>
</template>

<script>
export default {
  name: "Comp2"
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