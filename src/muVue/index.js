// Vue2.0 data数据响应式原理 Object.defineProperty()
// Vue3.0 data数据响应式原理 new Proxy()

// 监听对象中的属性
function DefineProperty(obj, key, val) {

    // 递归调用：解决监听不到嵌套对象中的属性
    if ('Object' === DataType(val)) {
        ObjectServer(val);
    }

    // 用Object.defineProperty()的特性，拦截数据的状态，达到数据响应式效果
    Object.defineProperty(obj, key, {
        // 访问：获取对象属性时
        get() {
            console.log('get：', val, '被访问了');
            return val;
        },

        // 修改：给对象属性设置新值时
        set(newVal) {
            if (val !== newVal) {
                console.log('set：', val, '被修改为：', newVal);

                ObjectServer(newVal); //解决在修改对象属性时，传的是一个新对象，导致无法监听新对象属性
                val = newVal;
            }
        }
    })
};

// 判断是否是对象 或 是数组
function DataType(obj) {
    switch (Object.prototype.toString.call(obj)) {
        case '[object Array]':

            return 'Array';

        case '[object Object]':

            return 'Object';

        default:

            return "obj is Not Object or Array";
            break;
    }
};

// 实现监听多个属性
function ObjectServer(obj) {

    // 传进来的值必须是一个对象
    if ('Object' === DataType(obj)) {

        // Object.keys(obj).forEach((key) => {
        //     return DefineProperty(obj, key, obj[key])
        // });

        // 每次进来时都创建一个新的实例
        new obServer(obj);
    }
};

// 实现能监听 对象新增 或 动态添加对象属性
function setData(obj, key, val) {
    DefineProperty(obj, key, val);
};

// 数据访问代理 实现将$data中的key代理到 muVue实例上，就是在实例化let app = new nuVue(el: '', data:{xxx: 123})后，可以用app.xxx 方式来访问 data中的xxx数据
function DataProxy(mu) {
    Object.keys(mu.$data).forEach(key => {
        Object.defineProperty(mu, key, {
            get() {
                return mu.$data[key];
            },

            set(val) {
                mu.$data[key] = val;
            }
        })
    })
};

class muVue {
    constructor(options) {
        // 保存实例化时传来的数据
        this.$options = options;

        this.$data = options.data;

        // 数据响应式处理
        ObjectServer(this.$data);

        DataProxy(this)
    };
};

// 处理每一个响应式对象，都是一个新实例
class obServer {
    constructor(params) {
        this.params = params;

        // 如果要处理数组这理还要判断一下
        this.walk(params);
    }

    walk(obj) {
        Object.keys(obj).forEach((key) => {
            return DefineProperty(obj, key, obj[key])
        });
    }

};