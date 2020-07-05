<template>
  <section class="alert-box" v-if="isShow">
    <div class="alert-main">
      <h3>{{title}}</h3>
      <p>{{message}}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Notice",
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    },
    time: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = true;
      // 自动删除
      setTimeout(this.hide, this.time);
    },
    hide() {
      this.isShow = false;
      this.remove();
    }
  }
};
</script>

<style lang="scss" scoped>
.alert-box {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .alert-main {
    padding: 10px 20px;
    min-width: 200px;
    border: 1px solid white;
    border-radius: 8px;
  background: rgba(255, 255, 255, 0.6);
  h3{
    text-align: left;
  }

  }
}
</style>