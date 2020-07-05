
// Event Bus  事件总线：事件派发、订阅回调管理，相当于一个中间人！ 【观察者模式】
export default class Bus {
    constructor() {
        this.cbs = {};
    }

    // 事件订阅处理
    $on(name, fn) {
        this.cbs[name] = this.cbs[name] || [];
        this.cbs[name].push(fn)
    }

    // 事件派发处理
    $emit(name, args) {
        if (this.cbs[name]) {
            this.cbs[name].forEach(cb => {
                cb && cb(args); // 核心：通过回调函数方式传值 
            });
        }
    }
}

/*

# 使用方法1

// 在main.js中全局挂载
Vue.prototype.$bus = new Bus();

// 在组件如 child1.vue中注册(派发)事件
this.$bus.$emit('mupiao', 2048)

// 在组件如 child2.vue中监听(订阅)事件
this.$bus.$on('mupiao', msg => {
    console.log(msg)
});




# 扩展

1、用new Vue() 代替 new Bus()

// 在实践中通常⽤Vue代替Bus.js，因为Vue已经实现了相应接⼝
Vue.prototype.$bus = new Vue()


2、用$parent也能达到$bus的效果，只要中间人[发布者和订阅者]是同一个就OK

// 在组件如 child1.vue中注册(派发)事件
this.$parent.$emit('mupiao', 2048)

// 在组件如 child2.vue中监听(订阅)事件
this.$parent.$on('mupiao', msg => {
    console.log(msg)
});

3、用$root也能达到$bus的效果，只要中间人[发布者和订阅者]（$root是根组件实例，是所有组件祖先）是同一个就OK

// 在组件如 child1.vue中注册(派发)事件
this.$root.$emit('mupiao', 2048)

// 在组件如 child2.vue中监听(订阅)事件
this.$root.$on('mupiao', msg => {
    console.log(msg)
});


*/