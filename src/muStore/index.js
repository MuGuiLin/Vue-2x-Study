import Vue from 'vue';
// import Vuex from 'vuex';
import Vuex from './muVuex';

Vue.use(Vuex);

export default new Vuex.Store({
    // strict: true,

    // 要做到数据响应式（注：依赖Vue）
    state: {
        numSum: 1
    },

    mutations: {
        // 方法中的state哪来的？
        add(state, par) {
            state.numSum++;
            console.log('接收到的参数', par);
        },

        cut(state, par) {
            state.numSum--;
            console.log('接收到的参数', par);
        }
    },

    actions: {
        add({ commit }, par) {
            setTimeout(() => {
                // 异步调用
                commit('add', par);
            }, 2000);
        },

        cut({ commit }, par) {
            setTimeout(() => {
                // 异步调用
                commit('cut', par);
            }, 1000);
        }
    },

    getters: {
        doubleNumSum: state => {
            return state.numSum * 2;
        }

    },

    modules: {

    }
});
