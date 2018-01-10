---
layout:       post
title:        "ECMAScript 6/7/8 特殊收容措施"
subtitle:     "Iterator ? Generator ? Proxy ? WHAT THE FUCK"
date:         2016.10.21 09:25:15
author:       "Sakuya"
header-img:   "img/in-post/post-bg-js.jpg"
header-mask:  0.3
catalog:      true
tags:
    - JavaScript
---

本篇文章是修改自博客改版前的《ECMAScript 6/7/8 笔记》，主要内容是一些新语法特性的记录。

## 装饰器(Decorators)

可以阅读[Javascript 中的装饰器](https://aotu.io/notes/2016/10/24/decorator/index.html)或者[ES6标准入门 Decorators篇](http://es6.ruanyifeng.com/#docs/decorator)

当装饰器作用于类本身的时候，操作的对象也是这个类本身，而当装饰器作用于类的某个具体的属性的时候，操作的对象既不是类本身，也不是类的属性，而是它的描述符（descriptor），而描述符里记录着这个类属性的全部信息，所以可以对装饰器自由的进行扩展和封装。

##### 作用于类时

```javascript
function isAnimal(target) {
    target.isAnimal = true;
  	return target;
}
@isAnimal
class Cat {
    ...
}
console.log(Cat.isAnimal);  // true

// 相当于
	
Cat = isAnimal(function Cat() { ... });
```

##### 作用于类属性时

```javascript
function readonly(target, name, descriptor) {
    discriptor.writable = false;
    return discriptor;
}
class Cat {
    @readonly
    say() {
        console.log("meow ~");
    }
}
var kitty = new Cat();
kitty.say = function() {
    console.log("woof !");
}
kitty.say()    // meow ~

// 相当于
let descriptor = {
    value: function() {
        console.log("meow ~");
    },
    enumerable: false,
    configurable: true,
    writable: true
};
descriptor = readonly(Cat.prototype, "say", descriptor) || descriptor;
Object.defineProperty(Cat.prototype, "say", descriptor);
```

## Class

class 本质是语法糖其核心调用的是`Object.defineProperty`

```javascript
class Cat {
    say() { console.log("meow ~") }
}
// class syntactic sugar
function Cat() {}
Object.defineProperty(Cat.prototype, "say", {
    value: function() { console.log("meow ~"); },
    enumerable: false,
    configurable: true,
    writable: true
});
```

一个常用的例子：

```javascript
class point {
  // 类默认方法 无显式定义则默认添加空constructor方法
  constructor (x, y) {
    this.x = x
    this.y = y

    this.count = this.count.bind(this)
  }

  // 相等于point.prototype.count 但不可枚举
  // 如果直接调用count则报错需要绑定this利用箭头函数或者在constructor绑定
  count () {
    return this.x + this.y
  }
}

// self只能在类内部使用 指代当前类 无需用到则可省略
const Count = class self {
  getClassName () {
    return self.name // self
  }
}
```

可以阅读[ECMAScript 6 入门 Class篇](http://es6.ruanyifeng.com/#docs/class)。首先是静态方法，在 Class 中如果在函数前加 `static` 那么表示该方法不会被实例继承但可被子类继承调用，而是直接通过类来调用。静态方法包含的 this 指向类而不是实例。关于 Class 中的[ prototype 属性和 __proto__ 属性](http://es6.ruanyifeng.com/#docs/class-extends#类的-prototype-属性和__proto__属性)，建议阅读链接中文章。

```javascript
class MathHelper {
  static sum(...numbers) {
    return numbers.reduce((a, b) => a + b)
  }
}
console.log(MathHelper.sum(1, 2, 3, 4, 5)) // <- 15
```

##### 继承

Class 继承方式则需要用到 `extends` 关键字。在下面的例子代码中，constructor 是这个类的构造函数。this 代表实例对象与 function 方式写构造函数一致。在子类的构造函数中出现了 `super` 这个关键字。`super` 可当作函数或者对象使用。

```javascript
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `X：${this.x}, Y：${this.y}`;
    }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); 
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString();
  }
}

Object.getPrototypeOf(ColorPoint) === Point // <- true
```

`super` 作为函数调用时代表父类的构造函数。子类 constructor 构造函数必须执行一次 `super` 函数。值得注意的是，`super` 虽然代表了父类 Point 的构造函数，但返回的是子类 ColorPoint 的实例，即 `super` 内部的 this 指的是 ColorPoint，因此 `super` 在这里相当于 `Point.prototype.constructor.call(this)`。`super` 作为函数时只能用在子类的构造函数之中调用。

`super` 作为对象时，在普通方法中指向父类的原型对象，既可直接调用父类方法例如 `super.toString()` 相当于 `Point.prototype.toString()`，由于 Super 指向父类原型所以在父类构造函数中定义的方法属性无法调用。如果在 static 静态方法中 `super` 作为对象调用则指向父类而不是父类原型。

Class为作为构造函数的语法糖，同时有prototype属性和_proto_属性，因此同时存在两条继承链：
- 子类的_proto_属性，表示构造函数的继承，总是指向父类。
- 子类prototype属性的_proto_属性，表示方法的继承，总是指向父类的prototype属性。（通过原型链继承的话只存在这个属性）

```javascript
class A {
}
class B extends A {
}
B._proto_ === A // true
B.prototype._proto_ === A.prototype // true
```
