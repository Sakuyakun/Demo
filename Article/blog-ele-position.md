---
layout:       post
title:        "JavaScript 获取元素宽高方法总结"
subtitle:     "JavaScript Retrieve the position of an HTML element"
date:         2015.11.26 20:12:31
author:       "Sakuya"
header-img:   "img/in-post/post-bg-js.jpg"
header-mask:  0.3
catalog:      true
tags:
    - JavaScript
    - 前端开发
---


### JavaScript API

#### getBoundingClientRect
获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置，返回对象共有六个属性分别是：top， left， right， bottom， width， height。其中top， left， bottom， left，这四个属性都是对应可视区域viewport的。

```javascript
var reacObject = document.querySelector('.box').getBoundingClientRect()
```

`reacObject` 中的内容：

- top: 获取元素上边界 距离 浏览器视口上边界的值
- left: 获取元素左边界 距离 浏览器视口左边界的值
- bottom: 获取元素下边界 距离 浏览器视口上边界的值
- right: 获取元素右边界 距离 浏览器视口左边界的值
- height: 元素自身高度
- width: 元素自身宽度

getClientRects 返回一个 ClientRectList 对象。
getBoundingClientRect 返回一个 ClientRect 对象，该对象包含在 ClientRectList 对象中。

#### offset dimension
获取元素在屏幕上占用的所有可见的空间。元素的可见大小由其高度、宽度决定,包括所有内边距、滚动条和边框大小（不包括外边距）。

```javascript
var ele = document.querySelector('.box'),
    width = ele.offsetWidth,
    height = ele.offsetHeight,
    left = ele.offsetLeft,
    top = ele.offsetTop;
```

- offsetTop 元素的上外边框 至 包含元素的上内边框之间的像素距离
- offsetLeft 元素的左外边框 至 包含元素的左内边框之间的像素距离
- offsetHeight 元素自身高度 包括元素的高度、(可见的)水平滚动条的高度、上边框高度和下边框高度。
- offsetWidth 元素自身宽度 包括元素的宽度、(可见的)垂直滚动条的宽度、左边框宽度和右边框宽度。

#### client dimension
获取元素内容及其内边距所占据的空间大小（不包括外边距、边框、滚动条）。

```javascript
var ele = document.querySelector('.box'),
    width = ele.clientWidth,
    height = ele.clientHeight,
```

- clientWidth 获取元素内容区宽度 加 左右内边距宽度
- clientHeight 获取元素内容区高度 加 上下内边距高度


### jQuery API

#### offset()
获取一个元素相对于document的当前位置

```javascript
var $ele = $('.box'),
    offsetLeft = $ele.offset().left,
    offsetTop = $ele.offset().top;
```

#### position()
获取一个元素相对于 父元素的偏移位置  

```javascript
var $ele = $('.box'),
    positionLeft = $ele.position().left,
    positionTop = $ele.position().top;
```

#### Height & Width
获取元素的宽高值
```javascript
var $ele = $('.box'),
    width = $ele.width(),
    height = $ele.height();
```

包含内边距padding
```javascript
var $ele = $('.box'),
    width = $ele.innerWidth(),
    height = $ele.innerHeight();
```

包含内边距padding与边距margin
不适用于window 和 document对象，可以使用.height()代替
```javascript
var $ele = $('.box'),
    width = $ele.outerWidth(),
    height = $ele.outerHeight();
```
