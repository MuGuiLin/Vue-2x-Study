<template>
  <div class="mu-form-item">
    <!-- 显示表单项文字 -->
    <label v-if="label">{{label}}</label>

    <!-- 内部表单组件 -->
    <slot></slot>

    <!-- 错误提示信息 -->
    <p v-if="error">{{error}}</p>

    <!-- <p>当前表单值：{{form.model[prop]}}</p>
    <p>当前表单校验规则：{{form.rules[prop]}}</p>-->
  </div>
</template>

<script>
import Schema from "async-validator";
import emitter from "../../mixins/emitter";
export default {
  name: "muFormItem",
  componentName: "muFormItem", //在 mixins中emitter中的dispatch()方法用的
  mixins: [emitter],
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: ""
    },
    // 用于区分表单项(校验规则的key)
    prop: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      error: ""
    };
  },
  mounted() {
    // 监听子组件派发事件validate
    // this.$root.$on("validate", () => {
    this.$on("validate", () => {
      this.validate();
    });

    // 如果该表单项需要校验时
    if (this.prop) {
      // 派发事件，通知muForm，新一个muFormItem实例，用于在全局校验时，方面查找所有muFormItem组件
      this.dispatch("muForm", "muForm-addField", [this]);
    }
  },
  methods: {
    // 当前表单项校验方法
    // 表单校验规则：用async-validator插件，ElementUI也是用的这个
    // 安装：npm i async-validator -S  //https://www.npmjs.com/package/async-validator
    validate() {
      //用户当前操作表单项的校验规则
      const rules = this.form.rules[this.prop];

      //用户当前操作表单项的值
      const value = this.form.model[this.prop];

      //   console.log(this.prop, rules, value);
      const schema = new Schema({ [this.prop]: rules });

      //schema返回的是一个Promise对象(如：在输入用户名时去后端查询这个名字是否有重名)，可以全局统一处理
      return schema.validate({ [this.prop]: value }, error => {
        //error中的数据就是在rules:{}中设置的数据，根据this.prop来找到的
        if (error) {
          this.error = error[0].message;
        } else {
          this.error = "";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mu-form-item {
  label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
  p {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    text-align: left;
  }
}
</style>