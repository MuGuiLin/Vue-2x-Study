# Vue-2x-Study

Vue 2系列 探究


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### 在新版的vue-cli中安装ElementUI 

```js
vue create my-app

cd my-app

vue add element

// 输入vue add element命令后根提示选择相应配置项

How do you want to import Element? // 您想如何导入Element？
  -> Fully import // 完全导入
     Import on demand // 按需进口

Do you wish to overwrite Element's SCSS variables?  // 您是否要覆盖Element的SCSS变量？（是/否）
  -> Yes

Choose the locale you want to load: // 选择您要加载的语言环境
  -> zh-CN

```


### 自定义主题
Element 的 theme-chalk 使用 SCSS 编写，如果你的项目也使用了 SCSS，那么可以直接在项目中改变 Element 的样式变量。新建一个样式文件，例如 element-variables.scss，写入以下内容：
```js
/* 改变主题色变量 */
$--color-primary: teal;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";
```

之后，在项目的入口文件中，直接引入以上样式文件即可（无需引入 Element 编译好的 CSS 文件）：

```js
import Vue from 'vue'
import Element from 'element-ui'
import './element-variables.scss'

Vue.use(Element)
```



### 全局完整引入 (注：如果用 vue add element 来安装这里就不用配置啦！)

在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

