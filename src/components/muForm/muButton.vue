<template>
  <button class="mu-button" :class="color" :type="type" @click="onClick">{{name}}</button>
</template>

<script>
export default {
  name: "muButton",
  props: {
    type: {
      type: String,
      default: "button"
    },
    color: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: "确定",
      required: true
    }
  },
  mounted() {
    console.log(this.$listeners);
  },
  methods: {
    onClick() {
      this.$emit("click");
      // console.log(this.$parent.event);
    }
  }
};
</script>

<style lang="scss" scoped>
.mu-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 10px;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.primary {
  color: #fff;
  background-color: #0586ff;
  border-color: #0586ff;
}

.success {
  color: #fff;
  background-color: #49cc08;
  border-color: #49cc08;
}

.warning {
  color: #fff;
  background-color: #fbae08;
  border-color: #fbae08;
}
.danger {
  color: #fff;
  background-color: #ff005e;
  border-color: #ff005e;
}
</style>