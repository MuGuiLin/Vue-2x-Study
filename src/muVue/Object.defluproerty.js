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
        Object.keys(obj).forEach((key) => {
            return DefineProperty(obj, key, obj[key])
        });
    }
};

// 实现能监听 对象新增 或 动态添加对象属性
function setData(obj, key, val) {
    DefineProperty(obj, key, val);
};


const obj = {};
DefineProperty(obj, 'name', 'mupiao');  // 这里每次只能监听一个指定的属性，不灵活！所以用ObjectServer()方法来实现监听多个属性
obj.name;  //访问
obj.name = 'muguilin'; // 修改




const obj2 = {
    name: '', age: 29, job: 'Web前端开发',
    menu: {
        path: '/index', name: '首页'
    }
};

ObjectServer(obj2); // OK 升级1：现在就可以监听obj2对象中的所有属性了
obj2.name = '沐枫';


obj2.menu.path = '/home'; // 【问题1】不能修改(监听不到)嵌套对象中的属性 【解决办法】判断对象的属性值如果也是一个对象，就是在DefineProperty()中递归调用ObjectServer(val)


obj2.menu = { path: '/', icon: 'home', name: '主页' } // 【问题2】在修改嵌套对象中的属性时，直接赋了一个新对象，然到再修改新对象中的属性时，就监听不到了 【解决办法】在执行修改属性时set(newVla) 再 ObjectServer(newVal); 配置一下新的对象属性，这样即便是传的是一个新对象也能被监听到
obj2.menu.path;
obj2.menu.path = '/page';


obj2.add = 666; // 【问题3】就是对象监听不到新增的属性，就是后来再给对象动态添加的属无法被性监听到 【解决办法】 就专门提供一个动态添加对象属性的方法 setDate()
setData(obj2, 'add', 666);
obj2.add;
obj2.add = 888;


// ? 如何实现数据组的数据响应式 
setData(obj2, 'arr', ['a', 'b', 'c', 1, 2, 3]); // 【问题3】 监听不到数组 因为 Object.defineProperty() 方法无法感知到数组特的方法如：push(), splice(i, 0), unpush()等
obj2.arr[0];
obj2.arr[0] = 'aa';
obj2.arr.push(0);
obj2.arr.pop(1)
