---
layout:       post
title:        "CSS 高兼容性布局方法"
subtitle:     "The different kinds of CSS Layout"
date:         2016.02.13 22:38:31
author:       "Sakuya"
header-img:   "img/home-bg-o.jpg"
header-mask:  0.3
catalog:      true
tags:
    - CSS
    - 前端开发
---

推荐在 [codepan](https://stackblitz.com/) 实验代码片段。

## 两列自适应布局
左侧固定右边自适应，或者右侧固定左侧自适应。

##### 方法一

利用浮动和边距

```html
<div class="container">
  <div class="left">CONTENT</div>
  <div class="right">CONTENT</div>
</div>
```

左边固定，右边自适应：

```css
.container{ width: 100%; overflow: hidden; }
.left{ height: 300px; width: 200px; background: #0095ff; float: left;}
.right{ height: 300px; margin-left: 200px; background: #b9e8d5; overflow: hidden;}
.container::after{content:''; clear: both; display: block; width: 100%;}
```

右边固定，左边自适应：
```css
.container{ width: 100%; overflow: hidden; }
.left{ height: 300px; background: #b9e8d5; overflow: hidden; float: right; width: 200px;}
.right{ height: 300px; background: #0095ff; margin-right: 200px;}
.container::after{content:''; clear: both; display: block; width: 100%;}
```

##### 方法二
父元素相对定位，固定区域绝对定位，自适应区域自动填充。
这种方式会影响到兄弟元素。不建议使用。
```html
<div class="container">
  <div class="left">CONTENT</div>
  <div class="right">CONTENT</div>
</div>
```

左边固定，右边自适应：

```css
.container{ position: relative; z-index: 1; padding-left: 200px; width: 100%;}
.left{ height: 300px; width: 200px; position: absolute; left: 0; top: 0; background: #0095ff;}
.right{ height: 300px; background: #b9e8d5}
```
或者
```css
.container{ position: relative; z-index: 1; width: 100%;}
.left{ height: 300px; width: 200px; position: absolute; left: 0; top: 0; background: #0095ff;}
.right{ height: 300px; margin-left: 200px; background: #b9e8d5}
```

右边固定，左边自适应：

```css
.container{ position: relative; z-index: 1; width: 100%;}
.left{ height: 300px; width: 200px; position: absolute; right: 0; top: 0; background: #0095ff;}
.right{ height: 300px; margin-right: 200px; background: #b9e8d5}
```

##### 方法三

利用Flex
flex-grow属性为1，将等分剩余空间
flex-shrink属性为1，当空间不足时都将等比例缩小

```html
<div class="container">
  <div class="left">CONTENT</div>
  <div class="right">CONTENT</div>
</div>
```
```css
.container{ display: flex; width: 100%; flex-direction: row; }
.left{ height: 300px; width: 200px; background: #0095ff; }
.right{ height: 300px; background: #b9e8d5; flex-grow: 1; flex-shrink: 1;}
```

##### 方法四

利用calc()由于display之间有间隙，这是渲染规范而不是bug，解决方法其中之一就是在父元素设置fontSize为0。

```html
<div class="container">
  <div class="left">CONTENT</div>
  <div class="right">CONTENT</div>
</div>
```
```css
.container{ width: 100%; font-size: 0;}
.left{ height: 300px; width: 200px; background: #0095ff; display: inline-block; font-size: 14px;}
.right{ height: 300px; background: #b9e8d5; display: inline-block; width:calc(100% - 200px); font-size: 14px;}
```

## 三列自适应布局

左右固定，中间自适应。

##### 利用浮动和边距

```html
<div class="container">
  <div class="left">CONTENT</div>
  <div class="right">CONTENT</div>
  <div class="center">CONTENT</div>
</div>
```
```css
.container{ width: 100%; height: 300px;}
.container::after{content: ''; clear: both; display: block; width: 100%;}
.left, .right{ height: 100%; width: 200px; background: #0095ff; }
.center { height: 100%; background: #b9e8d5;}

.left{ float: left; }
.center{ margin: 0 200px; }
.right{ float:right }
```

##### 利用flex

```html
<div class="container">
  <div class="left">CONTENT</div>
  <div class="center">CONTENT</div>
  <div class="right">CONTENT</div>
</div>
```
```css
.container{ width: 100%; height: 300px; display: flex; }
.left, .right{ height: 100%; width: 200px; background: #0095ff; }
.center { height: 100%; background: #b9e8d5;}

.left{ flex: 0 0 200px; }
.center{ flex-grow: 1; flex-shrink: 1; flex-basis: auto; }
.right{ flex: 0 0 200px; }
```
