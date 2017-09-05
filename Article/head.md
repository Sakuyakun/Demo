# HTML HEAD

Base URL，作用于文档包含的所有相对URL
```html
<base href="https://niconico.com">
```
<br/>

# META

Web 应用的名称（仅当网站被用作为一个应用时才使用）
```html
<meta name="application-name" content="appname">
```
<br/>

针对页面的简短描述（限制 150 字符）。该描述是被用作搜索结果展示片段的一部分。
```html
<meta name="description" content="some content">
```
<br/>

控制搜索引擎的抓取和索引行为
```html
<meta name="robots" content="index,follow"><!-- 所有搜索引擎 -->
<meta name="googlebot" content="index,follow"><!-- 仅对 Google 有效 -->
```
<br/>

Base URL，作用于文档包含的所有相对URL
```html
<base href="https://niconico.com">
```
<br/>

告诉 Google 不显示网站链接的搜索框
```html
<meta name="google" content="nositelinkssearchbox">
```
<br/>
 
告诉 Google 不提供此页面的翻译
```html
<meta name="google" content="notranslate">
```
<br/>
 
验证 Google 搜索控制台的所有权
```html
<meta name="google-site-verification" content="verification_token">
```
<br/>
 
验证 Yandex 网站管理员的所有权
```html
<meta name="yandex-verification" content="verification_token">
```
<br/>
 
验证 Bing 网站管理员中心的所有权
```html
<meta name="msvalidate.01" content="verification_token">
```
<br/>
 
验证 Alexa 控制台的所有权
```html
<meta name="alexaVerifyID" content="verification_token">
```
<br/>
 
验证 Pinterest 控制台的所有权
```html
<meta name="p:domain_verify" content="code from pinterest">
```
<br/>
 
验证 Norton 安全站点的所有权
```html
<meta name="norton-safeweb-site-verification" content="norton code">
```
<br/>
 
用来命名软件或用于构建网页（如 - WordPress、Dreamweaver
```html
<meta name="generator" content="program">
```
<br/>
 
关于你的网站主题的简短描述
```html
<meta name="subject" content="你的网站主题">
```
<br/>
 
基于网站内容给出一般的年龄分级
```html
<meta name="rating" content="General">
```
<br/>
 
允许控制 referrer 信息如何传递
```html
<meta name="referrer" content="no-referrer">
```
<br/>
 
禁用自动检测和格式化可能的电话号码
```html
<meta name="format-detection" content="telephone=no">
```
<br/>
 
通过设置为 “off” 完全退出 DNS 预取
```html
<meta http-equiv="x-dns-prefetch-control" content="off">
```
<br/>
 
在客户端存储 cookie，web 浏览器的客户端识别
```html
<meta http-equiv="set-cookie" content="name=value; expires=date; path=url">
```
<br/>
 
指定要显示在一个特定框架中的页面
```html
<meta http-equiv="Window-Target" content="_value">
```
<br/>

地理标签
```html
<meta name="ICBM" content="latitude, longitude">
<meta name="geo.position" content="latitude;longitude">
<meta name="geo.region" content="country[-state]"><!-- 国家代码 (ISO 3166-1): 强制性, 州代码 (ISO 3166-2): 可选; 如 content="US" / content="US-NY" -->
<meta name="geo.placename" content="city/town"><!-- 如 content="New York City" -->
```
