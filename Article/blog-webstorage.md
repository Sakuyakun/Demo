---
layout:       post
title:        "HTML5 Web Storage"
subtitle:     "HTML5 Web Storage"
date:         2015.11.26 20:12:31
author:       "Sakuya"
header-img:   "img/home-bg-o.jpg"
header-mask:  0.3
catalog:      true
tags:
    - HTML5
    - JavaScript
    - WebStorage
    - 前端开发
---


在 HTML5 中有两种在客户端存储数据的新方法：localStorage 与 sessionStorage。在这两种方法出来之前，cookie被滥用成存储方案，但 cookie 有大小限制。这两种方式都是通过键值对保存数据，存取方便，不影响网站性能。用法相同但存储时间不同。

localStorage 的数据保存在本地硬件上永久保存，可以手动调用api清除数据。sessionStorage 保存在 session 对象中，浏览器关闭时被清除。

localStorage 与 sessionStorage 提供的方法相同，以下是localStorage封装方便在业务代码中使用。
```javascript
const storage = (function () {
  const localStorage = window.localStorage
 
  function set (key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }
 
  function get (key) {
    const value = localStorage.getItem(key) || ''
 
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }
 
  function remove (key) {
    localStorage.removeItem(key)
  }
 
  return {
    set: set,
    get: get,
    remove: remove
  }
}())
 
export default storage
```

可通过在 window 对象绑定 storage 事件并指定其事件处理函数，当页面中对 localStorage 或 sessionStorage 进行修改时，则会触发对应的处理函数。
```javascript
window.addEventListener('storage', function(event){
  // event.key
  // event.oldValue
  // event.newValue
})
```

Web Storage 与 Cookie 的共同点在于都保存在浏览器端且同源，区别在于：

- Cookie数据始终在同源http请求中携带，在浏览器与服务器之间来回传递。而localStorage与sessionStorage仅保存在本地。
- 存储大小限制不同。Cookie数据大小不能超过4k，而而localStorage与sessionStorage存储大小在不同浏览器不一。
- 数据有效期不同。Cookie在设置过期时间前一直有效即使浏览器关闭。localStorage始终有效除非用户手动删除。sessionStorage窗口关闭前有效。
- 作用域不同。sessionStorage不能在不同浏览器共享即使同域相同页面。localStorage和Cookie在所有同源页面中都共享。
