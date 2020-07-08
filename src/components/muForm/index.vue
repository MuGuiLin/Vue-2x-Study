<template>
  <section class="login">
    <muForm :model="model" :rules="rules" ref="muForm">
      <!-- v-model 指令在表单 <input>、<textarea> 及 <select> 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素 -->

      <muFormItem label="用户名" prop="userName">
        <muInput v-model="model.userName" placeholder="请输入用户名" />
      </muFormItem>

      <muFormItem label="密码" prop="password">
        <muInput type="password" v-model="model.password" placeholder="请输入密码" />
      </muFormItem>

      <muFormItem>
        <muButton color="primary" name="提交信息" @click="submitForm" />
        <muButton color="warning" name="重新填写" @click="resetForm" />
      </muFormItem>
    </muForm>

    <h3>响应式表单数据：{{model}}</h3>
  </section>
</template>

<script>
import muForm from "./muForm";
import muFormItem from "./muFormItem";
import muInput from "./muInput";
import muButton from "./muButton";
export default {
  name: "nuForm",
  components: {
    muForm,
    muFormItem,
    muInput,
    muButton
  },
  data() {
    return {
      model: {
        userName: "mupiao",
        password: "123456"
      },
      rules: {
        userName: [
          { required: true, message: "用户名不能为空！", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 1,
            max: 6,
            message: "密码长度必须在1到6个字符之间！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs.muForm.validate((isValid, err) => {
        if (isValid) {
          alert("OK 666");
        } else {
          console.error(err);
          alert("校验失败：" + err);
        }
      });
    },
    resetForm() {
      alert(666);
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  margin: auto;
  width: 650px;
}
</style>