<template>
  <section class="components">
    <h1>Vue组件的各件通信方式</h1>
    <pre class="pre">
      <b>父子组件通信</b>
        props
        <code>
          ⽗给⼦传值:
          // parent
          &lt;HelloWorld msg="my name is mupiao" :num="2048" />

          // child
          props: { msg: String }  或 props: { msg: {type: String, default: "父组件没传该值时，的默认值"} }
        </code>

        $children
        <code>
          // parent
          获取当前组件中的所有子组件实例（属性 和 方法）注： this.$children是一个数组，所以它不能保证子组件的加载顺序

          // 用$children获取第1个子组件中的属性
          console.log(this.$children[0].proMsg);

          // 用$children设置第1个子组件中的属性
          this.$children[0].proMsg = 'hello world';

          // 用$children调用第1个子组件中的show方法并传参过去
          this.$children[0].show(666);
        </code>

        $refs 
        <code>
          // parent
          获取当前组件中的所有已经设置好ref属性的元素(DOM或子组件) 注： this.$refs是一个对象，只要给DOM 或 组件添加了ref属性就能获取到
  
          // 用$refs获取ref=Child1Id的子组件中的属性
          console.log(this.$refs.Child1Id.proMsg);

          // 用$refs设置ref=Child1Id子组件中的属性
          this.$refs.Child1Id.proMsg = 'hello mupiao';

          // 用$refs调用ref=Child1Id的子组件中的show方法并传参过去
          this.$refs.Child1Id.show(888);
        </code>

      <b>子父组件通信</b>
        $emit('xxx', val) 自定义事件
        <code>
          ⼦给⽗传值:
          // parent
          &lt;HelloWorld @mupiao="myEvent($event)"/>

          // child
          this.$emit('mupiao', '1024')
        </code>

      <b>兄弟组件通信</b>

        $parent.$children[]

      <b>祖代与后代组件通信（隔层传参）</b>
          $attrs 与 $listeners
        <code>
          包含了⽗作⽤域中不作为prop被识别的特性绑定(当父组件传参数过来时不通过props声明和获取【如果在props中声明，则在$attrs中就没那个值了】，直接在模块标签中使用$attrs.xxx获取) ，( class 和 style 除外)。当⼀个组件没有声明任何 prop 时，
          可以通过 v-bind="$attrs" 和 v-on="$listeners" 将父组件传过来的属性 和 事件进行展开并传⼊内部子组件中，这在创建⾼级别的组件时⾮常有⽤！
          比如：在跨层级、隔代的爷孙组件之间通信，在经过父组件时在组件元素上添加 v-bind="$attrs" 和 v-on="$listeners" 就可以将爷组件传来的属性和事件一并转发给孙子组件！

          // parent
          &lt;ChildA msg="hello, world" 和 @mupiao="show"/>

          // child：并未在props中声明foo
          &lt;ChildB v-bind="$attrs" 和 v-on="$listeners" />

          // ChildB中的child 
            1、模块标签中在直接使用$attrs中的属性
            &lt;p>{.{$attrs.msg}}&lt;/p>
            
            2、调用父组件传来的在$listeners中的事件
            mounted() {
              this.$listeners.mupiao('666')
            }
        </code>

          provide 与 inject 
        <code>
          当跨层级、隔代的组件的层级超过了两层时选用，注： provide 与 inject 必须成对的，默认数据不是响应式的（如果数据是一个引用类型，就可以响应式）
          // ancestor 祖先组件 写在和data(){}平级的任意位置
          provide() {
            return {
              bar: '我是用provide传出来的值',
              msg: '1024, 2048'
            }
          },

          //descendant 后代组件   写在和data(){}平级的任意位置
           &lt;p>{.{bar1}}，{.{msg}}&lt;/p>

          // inject: ["bar", "msg"], // 如果inject里面的命名当前组件中的属性有重名时，像下面用对象来起别名和设置默认值
          inject: {
            // bar1: "bar",
            bar1: {
              from: "bar",
              default: "我是默认值"
            },
            msg: "msg"
          },
        </code>

      <b>任意关系（全局广播）</b>
        $bus Event Bus 事件总线 中间人（事件发布和订阅者）
        <code>
          $bus 先在main.js中，挂载全局 事件总线(event bus)：Vue.prototype.$bus = new Vue() 然后自定义好事件名，就可以在任意组件中使用

          // 在组件如 child1.vue中注册(派发)事件
          this.$bus.$emit('mupiao', 2048)

          // 在组件如 child2.vue中监听(订阅)事件
          this.$bus.$on('mupiao', msg => {
              console.log(msg)
          });
   
          用$root也能达到$bus的效果，只要中间者[发布者和订阅者]（$root是根组件实例，是所有组件祖先）是同一个就OK
          this.$root.$emit('mupiao', 2048)
          this.$root.$on('mupiao', msg => {
              console.log(msg)
          });
     
          用$parent也能达到$bus的效果，只要中间者[发布者和订阅者]（同一个父级）是同一个就OK
          this.$parent.$emit('mupiao', 2048)
          this.$parent.$on('mupiao', msg => {
              console.log(msg)
          });
        </code>

        vuex
        <code>
          vuex 是一个状态管理器；它是一个独立的插件,适合数据共享多的项目里面,因为如果只是简单的通讯,使用起来会比较重；

          vuex中的store包含了以下对象属性：
            state:{},   // 定义存贮数据的仓库 ,可通过this.$store.state 或mapState访问
            getter:{},  // 获取 store 值,可认为是 store 的计算属性,可通过this.$store.getter 或 mapGetters访问
            mutation:{},// 同步改变 store 值,为什么会设计成同步,因为mutation是直接改变 store 值, vue 对操作进行了记录,如果是异步无法追踪改变.可通过mapMutations调用
            action:{},  // 异步调用函数执行mutation,进而改变 store 值,可通过 this.$dispatch或mapActions 访问
            modules:{}  // 模块,如果状态过多,可以拆分成模块,最后在入口通过...解构引入
        </code>
    </pre>

    <input type="text" v-model="msg" ref="input" />

    <!-- 最常见的组件通信方式：属性传递、事件派发 -->
    <Child1 :proMsg="msg" @mu-event="mupiao" ref="Child1Id"></Child1>

    <Child2 :proMsg="msg"></Child2>

    <Parent :proMsg="msg" :text="txt" num="1024" @myEvent="parEvent"></Parent>
  </section>
</template>

<script>
import Child1 from "@/components/Child1";
import Child2 from "@/components/Child2";
import Parent from "@/components/Parent";

export default {
  name: "Components",
  components: {
    Child1,
    Child2,
    Parent
  },
  data() {
    return {
      msg: "我是父组件中传过来的数据",
      txt: "my name is mupiao"
    };
  },
  provide() {
    return {
      bar: "我是用provide传出来的值",
      msg: "1024, 2048"
    };
  },
  inject: {
    bar1: "bar",
    msg: "msg"
  },
  computed: {},
  mounted() {
    console.log("this.$children：", this.$children);

    // 用$children获取第1个子组件中的属性
    console.log(this.$children[0].proMsg);

    // 用$children设置第1个子组件中的属性
    // this.$children[0].proMsg = "hello world";

    // 用$children调用第1个子组件中的show方法并传参过去
    this.$children[0].show(666);

    console.log("this.$refs：", this.$refs);

    // 用$refs获取ref=Child1Id的子组件中的属性
    console.log(this.$refs.Child1Id.proMsg);

    // 用$refs设置ref=Child1Id子组件中的属性
    // this.$refs.Child1Id.proMsg = "hello mupiao";

    // 用$refs调用ref=Child1Id的子组件中的show方法并传参过去
    this.$refs.Child1Id.show(888);
  },
  methods: {
    mupiao(par) {
      console.log("子组件child1调用时传来的：", par);
      this.msg = par;
    },
    parEvent(par) {
      this.msg = par;
    }
  }
};
</script>

<style lang="scss" scoped>
.components {
  .pre {
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
    }
  }
}
</style>