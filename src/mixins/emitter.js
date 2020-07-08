// 这是Element UI 源码中的 emitter.js //https://github.com/ElemeFE/element/tree/dev/src/mixins

// 广播查找：自上而下的派发事件 
/**
 * 
 * @param {组件名} componentName 
 * @param {事件名} eventName 
 * @param {参数} params 
 */
function broadcast(componentName, eventName, params) {
    // 遍历所有子元素(子组件)
    this.$children.forEach(child => {
        var name = child.$options.componentName;

        // 如果子元素的componentName 和 传进来的componentName相同，就派发事件 
        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
export default {
    methods: {
        // 冒泡查找：自下而上的派发事件 
        /**
         * 
         * @param {组件名} componentName
         * @param {事件名} eventName 
         * @param {参数} params Arrar
         */
        dispatch(componentName, eventName, params) {
            var parent = this.$parent || this.$root;
            var name = parent.$options.componentName;

            // 上向查找父级，直到找到父级的componentName 和 传进来的componentName相同的父组件
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.componentName;
                }
            }
            // 如果找到，就派发事件
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    }
};