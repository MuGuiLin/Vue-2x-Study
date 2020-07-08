<template>
  <div>
    <!-- <input :type="type" :value="value" @input="onInput" :placeholder="placeholder" /> -->
    <input :type="type" v-bind="$attrs" @input="onInput" />
  </div>
</template>

<script>
import emitter from "../../mixins/emitter";
export default {
  inheritAttrs: false, //关闭继承特性（Vue默认情况下将父组件继承下来特性会在根标签上展开示显）
  name: "muInput",
  mixins: [emitter], //混入
  props: {
    type: {
      type: String,
      defaule: "text"
    },
    value: String
    // placeholder: String

    // 在input标签中加上v-bind="$attrs"属性，就不用在prpos中声明了，v-bind="$attrs"会将父组件传过来的属性自动在标签上展开
  },
  methods: {
    onInput(e) {
      // console.log(e.target.value);

      // 向外派发事件实现双向数据绑定 注：vue默认会$on('input')监听input事件
      this.$emit("input", e.target.value);

      // 通知父组件 触发当前表单校验规则 （这里有个问题，如果当前表单的直接父级不是 muFormItem 组件，validate事件是监听不到了）
      //   this.$parent.$emit('validate');

      // 所以用上面混入emitter中的dispatch方法来派发事件
      this.dispatch("muFormItem", "validate");

      /*
        v-model 会忽略所有表单元素的 value、checked、selected attribute 的初始值而总是将 Vue 实例的数据作为数据来源。
        你应该通过 JavaScript 在组件的 data 选项中声明初始值。

        v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

        text 和 textarea 元素使用 value property 和 input 事件；
        checkbox 和 radio 使用 checked property 和 change 事件；
        select 字段将 value 作为 prop 并将 change 作为事件。
    */
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  -webkit-appearance: none;
  background-color: #ffffff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
</style>