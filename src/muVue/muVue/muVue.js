
function DefineProperty(obj, key, val) {

    // 递归调用，监听对象中嵌套的对象
    ObjectServer(val);

    Object.defineProperty(obj, key, {
        get() {
            console.log('get', val);
            return val
        },
        set(newVue) {
            if (newVue !== val) {
                console.log('set', val, 'to', newVue);

                // 监听所赋值的新对象，在修改对象属性时，赋的是一个新对象
                ObjectServer(newVue);
                val = newVue;
            }

        }
    })
};

// 判断数据类型
function DataType(data) {
    switch (Object.prototype.toString.call(data)) {
        case '[object Object]':
            return 'Object'
            break;
        case '[object Array]':
            return 'Array'
            break;

        case '[object String]':
            return 'String'
            break;
        default:
            break;
    }
};


class obServer {
    constructor(value) {
        this.value = value;

        // 注：这里应该判断一下是对象还是数组，现在只处理对象
        this.walk(value);
    }

    walk(obj) {
        Object.keys(obj).forEach(
            key => DefineProperty(obj, key, obj[key])
        );
    }
};

// 对象属性响应式处理
function ObjectServer(obj) {

    if ('Object' === DataType(obj) && null != obj) {

        // Object.keys(obj).forEach(key => {
        //     DefineProperty(obj, key, obj[key])
        // });

        // 每次都生成一个数据响应式实例
        new obServer(obj);
    }
};

// 数据代理
function DataProxy(mu) {
    Object.keys(mu.$data).forEach(key => {
        // 将mu.$data中的key 代理到mu实例上，这样就可以用mu.xxx访问了
        Object.defineProperty(mu, key, {
            get() {
                return mu.$data[key];
            },
            set(newVal) {
                mu.$data[key] = newVal;
            }
        })
    })
};

// 动态添加属性和值
function SetData(obj, key, val) {
    DefineProperty(obj, key, val)
};

/*
var obj = {
    name: 'mupiao',
    attr: {
        age: 29
    }
}

ObjectServer(obj);

obj.name;
obj.name = 666

obj.attr.age = 1025

obj.attr = { sex: '男' }
obj.attr.sex

SetData(obj, 'add', 123)
obj.add = 456;
obj.add
*/

// 模板编译过程
// new Compile(el, vm)
class Compile {
    constructor(el, mu) {

        this.$mu = mu;

        this.$el = document.querySelector(el);

        // 编译模板
        if (this.$el) {
            this.compile(this.$el)
        }

    }

    compile(el) {
        // 遍历el节点类型
        el.childNodes.forEach((node) => {
            if(this.isNode(node)) {

                console.log('编译标签节点：', node, node.nodeType, node.nodeName, node.textContent );

            } else if(this.isText(node)) {

                console.log('编译文本节点(插值表达式)：', node.innerText, node);
                console.log('编译文本节点(插值表达式)：', node.textContent, node);

                this.compileText(node);
            }

            // 向下递归 如果当前节点中还有子节点时，继续遍历
            if(node.childNodes) {
                this.compile(node);
            }
        })
    }

    // 判断是否是一个标签节点
    isNode(node) {
        return 1 === node.nodeType;
    }

    // 判断是否是一个文本节点 {{xxx}}
    isText(node) {
        return 3 === node.nodeType && /\{\{(.*)\}\}/.test(node.textContent);
        console.log(RegExp.$1) // 获取第1个分组()中的内容
    }

    // 编译插文本表过式
    compileText(node) {
                            // RegExp.$1 正则中的第一个分组内容 this.$mu[] === this.$data[] 因为做了代理
        node.textContent = this.$mu[RegExp.$1];
    }
    
}



class muVue {
    constructor(options) {
        // 保存在实例化时传来的数据
        this.$options = options;

        this.$data = options.data;

        // data数据响应式处理
        ObjectServer(this.$data);

        // data数据代理，将this.$data中的数据变成，可以在直接this实例上访问！
        DataProxy(this);

        new Compile(this.$options.el, this)
    }
};



