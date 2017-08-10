# 一些笔记
种草

## CSS

### 盒模型？

对盒模型印象还是挺深刻毕竟是在基础不过的内容，面试也遇到过要求画出盒模型。这里通常都会画两个盒模型，一个是IE的兼容模式怪异盒模型和根据W3C标准渲染的标准盒模型。标准与怪异盒模型从内到外为content、padding、border、margin。区别在于获取的宽度：标准盒模型width属性为content宽度，而怪异width属性则为content+padding+border。可通过box-sizing属性控制盒模型。box-sizing应用场景我个人使用最多的情况就是当一个元素有border当又想限制在设定的width内就将box-sizing属性设置为border-box。根据布局不同情况来设置。

### Flex布局？

除了flex大法好外我也不知道该说啥，这是我用过最爽的布局方式当然也有弊端兼容性方面问题，除非得兼容IE不然现在已经可以不用再多考虑这个问题，caniuse网站搜索排行第一的flex可知其火热程度，以前的啥双飞翼圣杯布局和目前移动端页面一些布局都可用flex简单解决。使用较多的是在flex布局里item上设置flex的缩写属性
```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
} 
```
对应的三个值分别是：
- flex-grow：定义item放大比例。当存在剩余空间时，1等分剩余空间，2占据多一倍，0不放大。
- flex-shrink：定义item的缩小比例。当空间不足时，1等比缩小，0不缩小。
- flex-basis: 设置为auto时，item设置的宽高不会将其计算入剩余空间。设置为0%时则item的宽高无效，会根据item数量在当前空间计算剩余空间。这个剩余剩余空间就是grow和shrink比例计算基础。

### Grid布局？

如果提到flex就要说grid，现在与未来主流两大布局方案。学过，但从来没在实际项目应用现在几乎全忘了。

## JavaScript

### 原型链，对象，构造函数之间的一些联系？

粗略的说大概就是构造函数原型继承自Object对象。一个构造函数目的就是为了初始化实例对象，取名为MYFN。而MYFN的实例对象中有一个prototype指针指向MYFN原型链。代码如下。obj实例中的指针在规范中名称为[[Prototype]]，而浏览器中这个指针就是实例中的`_proto_`属性。
```javascript
function MYFN() {
  this.name = 'saku'
}
const obj = new MYFN()

obj._proto_ === MYFN.prototype // true
MTFN.prototype._proto_ === Object.prototype //true

MYFN._proto_ === Function.prototype // true
Function.prototype._proto_ === Object.prototype //true
```
原型链中的`_proto_`指针指向Object的原型。这里`Object.prototype._proto_`为null。Object.prototype谁创建的，这个我还真不知道。

### DOM事件绑定方式？

最常用的DOM0级的onclick、onmousedown等绑定事件，需要注意的就是无法在同一个DOM添加多个绑定，这时就用到addEventListener，还有配对removeEventListener无需用`onclick = null`这种取消方式，还可传入第三个参数设置冒泡或捕获阶段执行事件。

## 关于babel？
语法编译器，可将一些浏览器环境不支持的新特性语法转换为支持的代码语法执行。在刚学webpack搭环境的那段时间被别人项目的一堆bebel依赖弄得有点懵。官方文档写的比较清楚，其实也是按需安装。

必装的是`babel-core`，babel核心代码。
其次是`babel-loader`webpack所需要的loader。

`babel-plugin-*` 就是一系列新特性的转码插件例如`babel-plugin-arrow-functions` 箭头函数。
[插件列表](https://babeljs.io/docs/plugins/#transform-plugins-es2015)，当然目前现状es6语法被大量支持，这些插件都不重要除非是想在低版本浏览器使用某个指定特性。

`babel-preset-*` 如果想搭es6/7开发环境，那也不可能是装一个个plugin。直接安装`babel-preset-env`，这个插件会根据当前运行环境进行自动转换代码。`babel-preset-stage-X`就得提到ecmascript制定流程了，0-4分别表示五个阶段：

> The TC39 categorizes proposals into the following stages:
> - Stage 0 - Strawman: just an idea, possible Babel plugin.
> - Stage 1 - Proposal: this is worth working on.
> - Stage 2 - Draft: initial spec.
> - Stage 3 - Candidate: complete spec and initial browser implementations.
> - Stage 4 - Finished: will be added to the next yearly release.

最后还得提`babel-runtime`和`babel-polyfill`这两货。上面语法转换插件并没有提供api例如promise、set、map和对象上新增的方法等等都不会转码，这两货就是为了干这事的。runtime和polyfill干的事相同但实现方法不一样。

那`babel-polyfill`和`babel-runtime`如何选择？如果不介意污染全局变量用`babel-polyfill`，因为polyfill的工作方式是在全局对象上添加执行环境不支持的对象属性，例如在global上添加promise这样不支持promise的执行环境就会调用全局方法上的promise属性。

而如果在写模块为了避免污染使用者的环境只能用 `babel-runtime` + `babel-plugin-transform-runtime`。

## Web

### HTTP2.0，WebSocket，HTTPS？
都了解的不多，简单写写。

#### HTTP2.0
HTTP2.0提及较多的就是多路复用、服务端推送和header压缩这三个特性。可以看看这篇[HTTP2深入研究性能测试](https://segmentfault.com/a/1190000007219256#articleHeader11)文章
- header压缩。大概就是有这么一份header fields表，server和client双方会缓存http中header的信息，互相收发数据时就可避免每次都传输相同header信息
- 多路复用。一个连接上可有多次request请求。
- 服务端推送。server主动向client推送资源。

> stream就是在HTTP/2连接上的双向帧序列。每个http request都会新建自己的stream，response在同一个stream上返回。多路复用（MultiPlexing），即连接共享。之所以可以复用，是因为每个stream高度独立，堵塞的stream不会影响其它stream的处理。一个连接上可以有多个stream，每个stream的frame可以随机的混杂在一起，接收方可以根据stream id将frame再归属到各自不同的request里面。

#### WebSocket

HTML5出的持久化协议，是基于HTTP协议。一个websocket请求中：
```
GET / HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Host: example.com
Origin: http://example.com
Sec-WebSocket-Key: sN9cRrP/n9NdMgdcy2VJFQ==
Sec-WebSocket-Version: 13
```
其中`Upgrade: websocket`和`Connection: Upgrade`是通知server端发起的是ws协议。`Sec-WebSocket-Key`由浏览器随机生成，可以尽量避免普通HTTP请求被误认为Websocket协议。`Sec-WebSocket-Version`表示支持的Websocket版本。server端返回下面信息说明成功建立websocket。
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: fFBooB7FAkLlXgRSz0BT3v4hq5s=
Sec-WebSocket-Location: ws://example.com/
```

在应用websocket之前，如果想接受server最新发的信息并处理的操作方法就是长轮询，因为http协议server端不能主动联系client端，所以只能通过不断建立http连接等待server端发送。当server端协议从http升级到websocket后，只需最开始握手阶段经过一次http请求，就可以做到client端无需处理便直接接受server推送的消息。

#### HTTPS
HTTPS = HTTP + SSL/TLS。https协议是在http协议基础上加了一层ssl/tls协议进行数据加解密。即便数据被拦截没有秘钥的话也只是一串乱码大大提高安全性，大概是三四年前的时候chrome就开始启用当对非https网站访问时进行警告，在那个时候貌似百度才开始整站启用https。先[占个位](http://blog.itbiu.com/2017/03/09/201703091/)以后再补。
