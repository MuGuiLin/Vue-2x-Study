import Vue from "vue";

// 保存实例化后的Vue实例，保证在Store类和install插件方法中可以访问、调用
let muVue

class Store {
    // 接收在 new Vuex.Store({state:{},mutations:{},actions:{}....}) 传过来的传 === params
    constructor(params) {

        // 借用vue 实现state的数据响应式
        // this.state = new Vue({
        this._vm = new Vue({
            // data: params.state
            data: {
                $$state: params.state // 为不向外面暴露 用$$(这是vue的机制)、get、set方法 
            }
        });

        // 保存 mutations
        this._mutations = params.mutations;
        this._actions = params.actions;

        // 绑定this到store实到上, 用于在dispatch()异步操用时解决this指向问题
        // const store = this;
        // this.commit = this.commit.bind(store);

        // 官方写法  绑定this到store实到上, 用于在dispatch()异步操用时解决this指向问题
        const store = this;
        const { commit, action } = store;

        this.commit = function bindCommit(type, payload) {
            commit.call(store, type, payload)
        };

        this.action = function bindCommit(type, payload) {
            return action.call(store, type, payload)
        };

        // 实现getters，类似state的计算属性方法， 当有多个时，需循环用户所传入getters所有的key，并动态赋值，而这个值是函数执行后的结果 不能 this.getters.doubleNumSum = "params.getters.doubleNumSum(store.state)"

        this.getters(params.getters);  // 天王盖地虎
    }

    getters(getter) {

        let key = Object.keys(getter);

        // store._makeLocalGettersCache = Object.create(null)
        // const wrappedGetters = store._wrappedGetters
        // const computed = {}
        // forEachValue(wrappedGetters, (fn, key) => {
        // computed[key] = partial(fn, store)

            Object.defineProperty(getter, key, {
                get: () => {
                    return this.state[key];
                },
                set: (v) => {
                    this.state[key] = v;
                }
            })
        // })
    }

    get state() {
        return this._vm._data.$$state
        // return this._vm.data.$$state
    }

    set state(v) {
        console.error('不能直接修改state中的数据')
    }

    commit(type, payload) {
        const entry = this._mutations[type];
        if (entry) {
            entry(this.state, payload);
        } else {
            console.error('没有找到mutations中的type');
        }
    }

    dispatch(type, payload) {
        const entry = this._actions[type];
        if (!entry) {
            console.error('没有找到actions中的type');
            return;
        }
        // 注意 这里的this指向，所以在上面做了this 绑定
        return entry(this, payload);
    }


}

// install方法 Vue.use() 装载插件是 时会找查install方法
function install() {
    muVue = Vue;

    // 调用Vue提供的mixin方法 混入
    // console.log('-----------------------------------mixin', Vue.mixin)
    Vue.mixin({
        beforeCreate() {
            // console.log(this, this.$options) // this.$options === { router,  store, render: h => h(App) } 就是在main.js中 new Vue({ router,  store, render: h => h(App) }).$mount('#app') 大括号对象中的数据
            // console.log('------------this.$options', this.$options)
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store; //实现挂载$store
                muVue.prototype.$store = this.$options.store; //实现挂载$store
            }
            // console.dir('------------Vue', muVue.prototype)
        }
    });

}

// export default Store;
// 此处导出对象可理解为Vuex
export default { Store, install }



/**
    vuex原理解析
    vuex是用vue.use(vuex) 以插件的形式注册到vue中的，这样就可以全局使用的

    1、挂载$store

    2、声明Store类，在Store类中需要实现如下vuex的基本方法
        state:{} 响应式属性
        commit() 同步修改state中的数据
        dispatch() 异步修改state中的数据( 要支持Premise，在then再时执行commit() 同步修改state中的数据)
        gettres:{} state的计算属性


 */