# 层叠水平 (stacking level)

![](https://camo.githubusercontent.com/79a1aa1dc3ac671b2fe08ce35ab8b464a599c3b5/687474703a2f2f696d616765732e636e626c6f67732e636f6d2f636e626c6f67735f636f6d2f636f636f31732f3838313631342f6f5f737461636b696e676c6576656c2e706e67)

1、形成堆叠上下文环境的元素的背景与边框
2、拥有负 z-index 的子堆叠上下文元素 （负的越高越堆叠层级越低）
3、正常流式布局，非 inline-block，无 position 定位（static除外）的子元素
4、无 position 定位（static除外）的 float 浮动元素
5、正常流式布局， inline-block元素，无 position 定位（static除外）的子元素（包括 display:table 和 display:inline ）
6、拥有 z-index:0 的子堆叠上下文元素
7、拥有正 z-index: 的子堆叠上下文元素（正的越低越堆叠层级越低）

# 触发一个元素形成 堆叠上下文

- 根元素 (HTML)
- z-index 值不为 "auto"的 绝对/相对定位
- 一个 z-index 值不为 "auto"的 flex 项目 (flex item)，即：父元素 display: flex|inline-flex
- opacity 属性值小于 1 的元素（参考 the specification for opacity）
- transform 属性值不为 "none"的元素
- mix-blend-mode 属性值不为 "normal"的元素
- filter值不为“none”的元素
- perspective值不为“none”的元素
- isolation 属性被设置为 "isolate"的元素
- position: fixed
- 在 will-change 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值
- -webkit-overflow-scrolling 属性被设置 "touch"的元素


# 单行居中，多行居左，两行超过省略号

```html
<div class="container">
  <h2><p><em>我是单行标题居中</em></p></h2>
  <h2><p><em>我是两行标题两行标题两行标题居左</em></p></h2>
  <h2><p><em>我是超过两行的标题最后点号省略我是超过两行的标题最后点号省略我是超过两行的标题最后点号省略省略省略</em></p></h2>
</div>
```

```css
*{
  margin:0;
  padding:0;
}

h2 em {
  position: relative;
  font-style: normal;
  text-align: left;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.container{
  width:320px;
  padding:0 10px;
  margin:10px auto;
  background: #ddd;
}

.container p {
  display: inline-block;
  text-align: center;
}

h2{
  text-align: center;
  padding:10px 0;
}
```
