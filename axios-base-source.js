const toString = Object.prototype.toString;

function isArray (val) {
  return toString.call(val) === '[object Array]';
}

function bind (fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

// utils.extend(instance, Axios.prototype, context)
// utils.extend(instance, context)
function extend (a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      // instance[request] = bind(request, thisArg)
      a[key] = bind(val, thisArg);
    } else {
      // instance[request] = context
      a[key] = val;
    }
  });
  return a;
}

function forEach (obj, fn) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }
  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

function merge (/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

const utils = {
  bind,
  extend,
  forEach,
  merge
}


// ----------------------------

// 默认配置
let defaults = {}

function Axios (instanceConfig) { }
Axios.prototype.request = function (config) {
  this.default = config
  // 请求逻辑
  console.log(config)
}

// 往原型链上添加扩展方法
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodWithData (methods) {
  // 扩展方法始终调用的是 request 只是传入不同参数
  Axios.prototype[methods] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      methods,
      url
    }))
  }
})
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData (method) {
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

function createInstance (defaults) {
  // 创建一个Axios实例
  let context = new Axios(defaults)

  // 以下代码也可以这样实现：let instance = Axios.prototype.request.bind(context);
  // 这样instance就指向了request方法，且上下文指向context，所以可以直接以 instance(option) 方式调用 
  // Axios.prototype.request 内对第一个参数的数据类型判断，使我们能够以 instance(url, option) 方式调用
  let instance = utils.bind(Axios.prototype.request, context)

  // 把Axios.prototype上的方法扩展到instance对象上，
  // 这样 instance 就有了 get、post、put等方法
  // 并指定上下文为context，这样执行Axios原型链上的方法时，this会指向context
  utils.extend(instance, Axios.prototype, context)

  // 把context对象上的自身属性和方法扩展到instance上
  // 注：因为extend内部使用的forEach方法对对象做for in 遍历时，只遍历对象本身的属性，而不会遍历原型链上的属性
  // 这样，instance 就有了  defaults、interceptors 属性
  utils.extend(instance, context)

  // 现在 instance 有了原型链上的扩展方法，也有了实例属性
  return instance
}

let axios = createInstance(defaults)

module.exports = axios