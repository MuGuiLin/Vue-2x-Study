<template>
  <form class="mu-form">
    <!-- 内容分发 -> 匿名插槽 -->
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "muForm",
  componentName: "muForm", //在 mixins中emitter中的dispatch()方法用的
  props: {
    //数据
    model: {
      type: Object, //数据类型
      //   default: {}, // 数据默认值
      required: false // 数据是否必填
    },
    // 表单校验规则
    rules: Object
  },
  provide() {
    return {
      form: this // 扫当前muForm实例分发给所有子组件，便于在子组件中获取model，rules等数据
    };
  },
  components: {},
  data() {
    return {
      muFormItems: []
    };
  },
  created() {
    this.$on("muForm-addField", item => {
      //   只要有增加一个muFromItem组件，就在这里进行push存储一下
      //   console.log(item);
      this.muFormItems.push(item);
    });
  },
  methods: {
    // 全局表单项校验方法，执行所有muFormItem中的校验方法，统一处理结果
    validate(cb) {
      // console.log(this.$children, this.$children[0].validate);

      // 获取所有子组件muFormItem中的validate()方法转换为Promise数组（Schema返回的本身就是一个Promise对象）注：由于不是所有muFormItem都要做验证，所以要过滤掉没有prop属性的muFormItem，不然全部获取会报错！

      // const tasks = this.$children.filter(item => item.prop).map(item => item.validate());

      // 将this.muFormItems中存储的所有子组件muFormItem方法转换为Promise数组，这里借鉴了ElementUI中的源码，然后经过mixins混入方式，在子组件muFormItem创建时，判断是否需要校验，如果要校验，就触发父组件muForm，把自己保存到muFormItems中
      const tasks = this.muFormItems.map(item => item.validate());

      Promise.all(tasks)
        .then(() => cb(true))
        .catch(err => cb(false, err));
    }
  }
};
</script>

<style lang="scss" scoped>
.mu-form {
  margin: 50px 0;
  padding: 50px;
  border: 1px solid gray;
  border-radius: 8px;
}
</style>