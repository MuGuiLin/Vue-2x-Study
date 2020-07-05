import Vue from 'vue';

export default function alert(Component, props) {

    //创建实例
    // Vue.extend();

    const vm = new Vue({
        render(h) {
            return h(Component, { props });
        }
    }).$mount();  //$mount() 将vdom(虚拟dom) 转化为 真正的dom


    // 通过vm.$el实例获取出来，生成dom(追加到body中)
    document.body.appendChild(vm.$el);

    // 获取实例根组件
    const root = vm.$children[0];

    root.remove = () => {
        // 从body中反向操作移除自己
        document.body.removeChild(vm.$el);

        // 释放实例自己所占资源
        vm.$destroy();
    };

    // 返回组件实例
    return root;
};