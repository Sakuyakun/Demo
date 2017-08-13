title: 类型转换笔记
date: 2016-08-12 08:45:16
categories: 前端
tags: javascript
---

弱类型语言JS的基础类型转换与隐式类型转换。

<!-- more -->

# 基础类型转换
Boolean Number String

## Boolean值转换
- String true：任何非空字符串 false：空字符串
- Number true：任何非0的数值（包括无穷大） false：0和NaN
- Object true：任何对象  false：null
- Undefined true：N/A  false：undefined

## Number值转换
这里主要写写`Number()`函数的转换规则。

Boolean、Number、Undefined转换为Number：
- Boolean，true转换为1，false转换为0
- Null，转换为0
- Undefined，转换为NaN

String转换为Number：
- String中单纯只包含数字，则转换为十进制数字
- String中包含有效十六进制格式数值，则转换为相同的十进制数值
- String中值包含有效浮点格式的数值，则转换为对应浮点格式的数值，例如`Number('1.1') === 1.1`
- String为空，则转换为0
- String包含上述格式之外的字符，则转换为NaN

Object转为Number：调用对象的`valueOf()`方法，然后依照前面的规则转换返回的值。如果转换的结果是NaN，则调用对象的`toString()`方法，然后再次依照前面的规则转换返回的字符串值。

NaN是特殊的数值，表示一个返回数值的操作数未返回数值的情况。例如0除以0都会返回NaN。任何涉及到NaN的操作都会返回NaN。NaN与任何数值都不想等包括自身。js中定义了`isNaN()`函数用来判断一个数是否不是数值。
```javascript
isNaN(NaN) //true
isNaN(10) //false（10 是一个数值）
isNaN("10") //false（可以被转换成数值10）
isNaN("blue") //true（不能转换成数值）
isNaN(true) //false（可以被转换成数值1）
```
`isNaN()`也可判断对象。在基于对象调用`isNaN()`函数时，会首先调用对象的`valueOf()`方法，然后确定该方法返回的值是否可以转换为数值。如果不能，则基于这个返回值再调用`toString()`方法，再测试返回值。

## String值转换
String值转换有两种方法`toString()`与`String()`。`toString()`用于将Number、Boolean、String、Object转为字符串，但Null与Undefined没有这个方法。`String()`补足了这一点将Null与Undefined转换为字符串，但转换其他类型值时依旧是调用to`String()`方法。

# 隐式类型转换
## 运算符与隐式转换
以下是一个表达式：
```javascript
let count = 1 + true;  //2
```
在大多数编程语言中，以上Number类型值与Boolean类型值相加是会报错的，但在js中却无报错且输出了2。这是js中的隐式转换，也是js被称为弱类型语言的原因，`Number(true) == 1`，将Boolean类型值true转换成了Number类型值1后再相加。

js中任何类型，进行`-`、`*`、`/`、`%`的运算，都会将运算值隐式转换为Number类型值再进行运算。而`+`运算符则与前面的运算符不同，还可将字符串拼接。当一个Number类型值与String类型值相加时，会将Number隐式转换为String类型值。
```javascript
let text = '1' + 1 + 1; //111
```
以上表达式输出`111`，明显是错误的。值得注意的是，操作顺序会影响输出的值。
```javascript
let text = 1 + 1 + '1';  //21
let text = '1' + (1 + 1); //12
```

## 操作符与隐式转换
与全等操作符`===`不同，相等操作符在比较两个值的时候会先将值转换为相似的类型再进行比较。

相等操作符在转换类型值时遵循以下规则：
1、如果有一个操作数为boolean值，则在比较前先将其转换为boolean值，再进行对比
2、如果一个操作数是String值，另一个操作数是数值，在比较相等性之前先将String值转换为数值

在比较时遵循一下规则：
1、如果对比值存在NaN，一律返回false
2、如果对比值分别是Null与Undefined，则相等
3、如果两个值为Object，则比较这两个值是否指向同一个堆内存中的Object
4、如果两个值分别为Number和Object，Object值先执行`valueOf()`尝试将Object转换为数值，返回如果不是Number类型则执行`toString()`将Object转换数值。

关于最后一点，下面有个小例子。
```javascript
var arr = [2];
console.log(arr == 2);
```
在与数值2进行对比时，arr首先会执行`valueOf()`，返回依旧是arr本身`[2]`。所以继续执行`toString()`方法将`[2]`转换为数字2再进行对比。所以结果为true
