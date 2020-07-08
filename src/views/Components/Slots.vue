<template>
  <section class="slot">
    <h1>插槽</h1>
    <p>插槽语法是Vue 实现的内容分发API，是一种内容分发技术，⽤于复合组件开发。该技术在通⽤组件库开发中有⼤量应⽤，注：不能在slot插槽加事件。</p>
    <pre>
      <b>1、匿名插槽：</b>
      <code>
        // 父组件在使用子组件时，在子组件标签中间插入的文本、标签等，会在子组件中显示出来，也就是所谓的内容分发！

        // parent
        &lt;Hello> Hello World &lt;b>666&lt;/b> &lt;/Hello>

        // comp1
        &lt;div>
          &lt;slot>&lt;/slot>  //Hello World 666
        &lt;/div>
      </code>

      <b>2、具名插槽：</b>
      <code>
        // 当在子组件中有多个&lt;slot>时，将内容用指令 v-slot:xxx 分发到指定的&lt;slot name="xxx">&lt;/slot>上，主要是用name属性来对应。

        // parent
        &lt;Hello>
          &lt;template> 
            Hello World &lt;b>666&lt;/b> 
          &lt;/template>

          &lt;template v-slot:mupiao> 
            Hello Earth &lt;b>888&lt;/b> 
          &lt;/template>
        &lt;/Hello>

        // comp2
        &lt;div>
          &lt;slot>&lt;/slot>  //Hello World 666
          &lt;slot name="mupiao">&lt;/slot>   //Hello Earth 888
        &lt;/div>
        
        // 匿名插槽 和 具名插槽的区别：在父组件中用v-slot指定，在子组件中用name接收就是具名插槽。
        // 简单来讲：没起名的就是匿名插槽，起了名的就是匿名插槽！
      </code>

      <b>3、作用域插槽：</b>
      <code>
        // 在向在子组件分发内容时（除了父组件的内容以外），还要用到子组件中的数据。

        // parent
        &lt;Hello>
          &lt;template v-slot:mupiao="info">
            &lt;h1>你好123&lt;/h1>
            {.{info.user}}
          &lt;/template>
        &lt;/Hello>

        // comp3
        &lt;div>
          &lt;slot name="mupiao" :user="userinfo">&lt;/slot> // 你好123 { name: 'mupiao', age: 29 }

          data(){
            return{
              userinfo: { name: 'mupiao', age: 29 }
            }
          }
        &lt;/div>
      </code>
    </pre>
    <hr />

    <!-- 匿名插槽 -->
    <Comp1>
      <h1>123，666</h1>姓名：
      <input type="text" />
    </Comp1>
    <hr />

    <!-- 具名插槽 -->
    <Comp2>
      <!-- 
        <h1>123</h1>
        <button>确定</button>
        <p>abcd，2014，2048，666</p>
      -->
      <!-- 设置 v-slot:default 和上面的效果一样 -->
      <template v-slot:default>
        <h1>123</h1>
        <button>确定</button>
        <p>abcd，2014，2048，666</p>
      </template>

      <!--  指定在子组件中显示的位置 v-slot: => name -->
      <template v-slot:mySlot1>
        <h1>Hello, World!</h1>
        <input type="date" />
        <input type="color" v-model="color" />
      </template>

      <template v-slot:mySlot2>
        <h1>Hello, Earth!</h1>
        <textarea cols="30" rows="5"> https://www.google.com/earth </textarea>
      </template>
    </Comp2>
    <hr />

    <!-- 作用域插槽 -->
    <Comp3>
      <!-- 把v-slot的值指定为作用域上下文对象 -->
      <template v-slot:default="mupiao">
        {{mupiao.user}}
        {{mupiao.user.job}}
        <p>
          <input type="text" v-model="msg" />
          <input type="range" v-model="num" min="0" max="100" />
          {{num}}%
        </p>
      </template>

      <!-- 把v-slot的值指定为作用域上下文对象 -->
      <template v-slot:point="mupiao">
        {{mupiao.fn}}
        <div :style="{'font-size': num+'px', 'color': color}">提示信息：数据提交成功！666！。。。</div>
      </template>
    </Comp3>
  </section>
</template>

<script>
import Comp1 from "@/components/Comp1";
import Comp2 from "@/components/Comp2";
import Comp3 from "@/components/Comp3";

export default {
  name: "Slots",
  components: {
    Comp1,
    Comp2,
    Comp3
  },
  data() {
    return {
      msg: "我是父级件中的数据",
      num: 36,
      color: "blue"
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.slot {
  pre {
    padding: 50px;
    text-align: left;
    font-size: 18px;
    line-height: 32px;
    code {
      display: inline-block;
      padding-right: 30px;
      color: white;
      background: #333;
      font-size: 16px;
      line-height: 28px;
      border-radius: 8px;
    }
    b {
      display: inline-block;
      margin-top: 30px;
      color: #15bc20;
    }
  }
}
</style>