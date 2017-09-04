```
title: 关于JavaScript模块化
date: 2016-11-02 05:12:41
categories: 前端
thumbnail: "https://www.tuchuang001.com/images/2017/08/01/aoi.jpg"
tags:
- 模块化
- javascript
---
```

模块化的发展程度以致于 ES6 规范中加入了 Module 语法。

<!-- more -->

# 关于模块化
最初的模块化尝试阶段，据我了解是使用JS的闭包和自执行函数模拟实现，在JS红宝书上也有介绍。但是模块化真正发展起来的是 CommonJS 规范的推出，NodeJS 就是对 CommonJS 模块规范的实现。问题在于，当 CommonJS 规范模块应用在浏览器端时，由于是运行机制是同步加载模块，必须等require的模块加载完成才继续执行下面的代码，等待时间取决于加载速度的快慢。

为了解决这个问题，RequireJS 模块加载器诞生了，而 AMD 规范就是 RequireJS 在推广过程中对模块定义的规范化的产出。由于采用异步方式加载模块，模块的加载不影响它后面语句的运行。依赖某些模块的语句都定义在一个回调函数中。等模块加载完毕后开始运行回调。于是 CommonJS 与 AMD 成为模块化主流规范，之后就有了 UMD（通用模块定义），同时兼容 AMD 与 CommonJS，写法相对而言比较复杂点。

再到后来 ES6 的模块语法出来后，语言层级支持无需引入第三方库，统一了API，写法清晰。可同时支持浏览器端与服务器端，且代码编译时就已经完成模块的加载。速度是优于其他加载方式的。

# 为何需要模块化
命名空间冲突
- 当写的代码提交合并测试后发现冲突
- 变量或函数重名覆盖了第三方JS库

文件依赖管理
- 意外的引入了多次相同的包文件
- 项目需引入JS库依赖包太多
- 当需要修改替换某个第三方库时或删除一个库时手动管理依赖
- 一个库需要四个额外的依赖包，并要按照指定顺序加载

# CommonJS
CommonJS 采用同步方式加载模块，在服务器上运行十分合适。但如果想在浏览器端使用 CommonJS 规范的模块可以使用 browserify 模块加载器。

CommonJS 定义的模块分为：模块引用(require) 模块定义(exports)和模块标识(module)，
- require()用来引入外部模块
- exports对象用于导出当前模块的方法或变量，是唯一的导出口
- module对象为模块本身

利用 browserify 加载器写个例子。
```javascript
// a.js
module.exports = function () {
    console.log('module a is ready');
};

//b.js
var moduleA = require('./a');
moduleA(); //输出module a is ready
```

[CommonJS Modules/1.0 规范](http://weizhifeng.net/commonjs-module-1.0-specification.html)

# AMD 与 RequireJS
AMD 规范的模块将被异步加载，模块加载不影响后面语句运行。所有依赖某些模块的语句均放置在回调函数中。模块可以是一个对象、函数、构造函数、字符串、JSON 或其它各种类型，而CommonJS仅支持对象作为模块。

RequireJS 的基本思想为：通过一个函数来将所有所需要的或者说所依赖的模块实现装载进来，然后返回一个新的函数（模块），我们所有的关于新模块的业务代码都在这个函数内部操作，其内部也可无限制的使用已经加载进来的以来的模块。

以 RequireJS 为例子
```javascript
// 定义模块 依赖于module1与module2
define([ 'module1', 'module2' ], function(m1, m2){
    // ...
});
define(function(require){
    const m1 = require('module1');
    const m2 = require('module2');
    // ...
});
 
// 调用模块 
require(['module1', 'module2'], function( module1, module2 ){
    module1.func();
    module2.func();
});
```

[RequireJS API](http://www.requirejs.cn/docs/api.html)
[AMD 规范](https://github.com/amdjs/amdjs-api/wiki/AMD)


# 结尾
目前个人认为最主流的规范、模块包管理和构建工具是ES6、Yarn和Webapck。由于Yarn有lock特性可锁版本号所以推出后的一段时间内火遍前端圈。在以前做过的项目用过SystemJS UMD规范加载器，使用jspm进行包管理。ES6应该是目前浏览器端模块化最优的处理方式了，AMD虽异步加载却写法冗余，且原生语法在编译阶段就已经处理好了模块加载，使用AMD的一个依赖过多的模块时也不好处理。CommonJS 就可以直接排除。

[ES6 Module](http://es6.ruanyifeng.com/#docs/module)
