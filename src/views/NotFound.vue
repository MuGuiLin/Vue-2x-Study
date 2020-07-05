<template>
  <section class="not-found">
    <img src="../assets/img/error404.png" />
  </section>
</template>

<script>
export default {
  name: "NotFound",
  components: {}
};
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(../assets/img/bg.jpg) no-repeat top right;
  background-size: 50%;
  img{
    width: 40%;
  }
}
</style>
