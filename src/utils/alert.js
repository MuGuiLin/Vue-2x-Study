import Vue from 'vue';

export default function alert(Component, props) {

    //创建实例
    const constr = Vue.extend(Component);

    // 村长喊你来搬砖
    const comp = new constr({propsData: props });

    comp.$mount();

    // 通过vm.$el实例获取出来，生成dom(追加到body中)
    document.body.appendChild(comp.$el);

    comp.remove = () => {
        // 从body中反向操作移除自己
        document.body.removeChild(comp.$el);

        // 销毁组件：释放实例自己所占资源
        comp.$destroy();
    };

    // 返回组件实例
    return comp;
}