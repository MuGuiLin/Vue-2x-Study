<template>
  <div class="VueApi">
    <h1>This is an VueApi page</h1>
    <pre>
      <code class="language-java">
      // Vue.util.defineReactive(obj,key,value,fn)
      // obj: 目标对象，
      // key: 目标对象属性；
      // value: 属性值
      // fn: 只在node调试环境下set时调用

      Vue.extend(Component)

      Vue.mixin({})
      </code>
    </pre>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$prismjs.highlightAll();
  }
};
</script>

<style>
</style>
