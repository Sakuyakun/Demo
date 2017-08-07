# H5与Android IOS原生交互方案

Hybrid App一直是我没有接触过的部分，在交接项目进行剩余开发工作后的过程中也多少有些了解。这篇文章内容是H5与Android和IOS交互方案的笔记。由于没有接触过Android和IOS，所以对这部分不太熟悉，只知道安卓是通过webView来加载H5页面。目前在我司做混合app，前端选择是React进行开发，因为一些老项目初期用的是ng1所以也有一部分是ng1的代码。我个人想的情况就是公司内部有大牛会慢慢去推React-Native。

# Android与H5交互

在安卓上展示H5页面用到的是webView，这是基于webkit引擎展现Web页面的一个控件。以下demo代码经过删减。
```java
WebView mywebview = new WebView(this);

//例：加载assets文件夹下的h5.html页面
mywebview.loadUrl("file:///asset/h5.html")
//例：加载网页
mywebview.loadUrl("https://www.google.com")
```
如果只通过调用`mywebview.loadUrl()`加载的话，当点击链接时页面将会在手机默认的浏览器上打开。那如果想要在App内中打开就得设置setWebViewClient：
```java
mywebview.setWebViewClient(new WebViewClient() {
  @Override
  public boolean shouldOverrideUrlLoading(WebView view, String url) {
    mywebview.loadUrl(url);
    return true;
  }
});
```

## Android调用JS方法
下面这个例子，当调用的js方法有返回值时则调用`mywebview.evaluateJavascript()`
```java
WebSettings webSettings = mywebview.getSettings();
//设置可调用js方法
webSettings.setJavaScriptEnabled(true);

mWebView.evaluateJavascript("myinfo('saku', 'male')", new ValueCallback<String>() {
  @Override
  public void onReceiveValue(String value) {
    Log.e(TAG, "info: " + value);
  }
});
```
JS中定义的myinfo：
```javascript
function myinfo(name = 'empty', male = 'empty'){
  return 'name:' + name + ', male:' + male
}
```

<br/>

另外一个例子是Android通过调用JS方法改变H5<body>元素class从而改变页面主题色。
```javascript
window.setTheme = function (mode) {
  if (mode == '0') {
    document.body.className = 'black-theme';
    window.localStorage.setItem('theme', 'black');
    // some code here...
  } else if (mode == '1') {
    document.body.className = 'white-theme';
    window.localStorage.setItem('theme', 'white');
    // some code here...
  }
};
```
Android调用setTheme：
```java
wv.loadUrl("javascript:setF10Theme('" + 0 + "')");
```

## JS调用Android方法
Android4.2以上可直接使用@JavascriptInterface注解声明Java方法
```java
public class JsInteration {
  @JavascriptInterface
  public String info() {
    return "my name is sakuya";
  }
}

mywebview.addJavascriptInterface(new JsInteration(), "fromAndroid");
```

JS中将这样调用
```javascript
const result = window.fromAndroid.info();
```

## JS传参与Android交互
这种方法实现原理是js发出一个url请求，并将所需的参数添加到该url中。android端通过`webView.setWebViewClient()`拦截url，解析url中携带的参数，并根据参数信息进行相应的操作。sendinfo://android为自定义的H5与android间的通信协议。
```javascript
document.getElementById('send').onclick = event => {
  let json = {"name": "sakuya"}
  window.location.href="sendinfo://android?data="+JSON.stringify(json)
}
```
Android代码如下
```java
webView.setWebViewClient(new WebViewClient() {
  @Override
  public boolean shouldOverrideUrlLoading(WebView view, String url) {
    // 通过判断拦截到的url是否含有自定义通信协议，来辨别是http请求还是调用android方法的请求
    String pre = "sendinfo://android";
    if (!url.contains(pre)) {
        //该url是http请求，用webview加载url
        return false;
    }
    // 该url是调用android方法的请求，通过解析url中的参数来执行相应方法
    // some java code here...
    return true;
  }
});
```

# IOS与H5交互


