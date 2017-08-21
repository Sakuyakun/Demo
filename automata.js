export const automata = {
  /**
  * 生成随机颜色
  * @returns {string} 十六进制颜色值
  */
  randomColor () {
    return '#' + Math.random().toString(16).substring(2).substr(0,6)
  },

  /**
  * 过滤字符串
  * @param {string} str 需要过滤的字符串
  * @param {string} type 替换内容（special-特殊字符, html-html标签, emjoy-emjoy表情, word-小写字母, WORD-大写字母, number-数字, chinese-中文)
  * @param {string} restr 替换成指定字符串，默认为''
  * @param {string} spstr 保留哪些特殊字符
  * @returns {string} 过滤后的字符串
  */
  filterStr (str, type, restr, spstr) {
    let typeArr = type.split(',')
    let _str = str;
    for(let i = 0, len = typeArr.length; i <len; i++){
      if (typeArr[i] === 'special') {
      let pattern,regText = '$()[]{}?\|^*+./\"\'+';
      if (spstr) {
        let _spstr = spstr.split(""),_regText="[^0-9A-Za-z\\s";
        for(let i = 0, len = _spstr.length; i<len; i++){
          if(regText.indexOf(_spstr[i])===-1){
              _regText += _spstr[i];
          }
          else{
              _regText += '\\'+_spstr[i];
          }
        }
        _regText += ']'
        pattern = new RegExp(_regText,'g');
      }
      else{
        pattern = new RegExp("[^0-9A-Za-z\\s]",'g')
      }
    }
    let _restr = restr || '';
    switch(typeArr[i]){
      case 'special': _str = _str.replace(pattern,_restr);break;
      case 'html': _str = _str.replace(/<\/?[^>]*>/g, _restr);break;
      case 'emjoy': _str = _str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g,_restr);break;
      case 'word': _str = _str.replace(/[a-z]/g,_restr);break;
      case 'WORD': _str = _str.replace(/[A-Z]/g,_restr);break;
      case 'number':_str =  _str.replace(/[0-9]/g,_restr);break;
      case 'chinese': _str = _str.replace(/[\u4E00-\u9FA5]/g,_restr);break;
      }
    }
    return _str;
  },

  /**
  * 手机类型判断
  * @param {string} str 手机类型
  * @returns {boolean} 是否是该手机类型
  */
  browserInfo (type) {
    switch (type) {
      case 'android':
        return navigator.userAgent.toLowerCase().indexOf('android') !== -1
      case 'iphone':
        return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
      case 'ipad':
        return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
      case 'weixin':
        return navigator.userAgent.toLowerCase().indexOf('MicroMessenger') !== -1
      default:
        return navigator.userAgent.toLowerCase()
    }
  },

  /**
  * 判断类型
  * @param {any} value
  * @returns {string}
  */
  type (value) {
    let class2type = {}
    "Boolean Number String Symbol Function Array Date RegExp Object Error".split(" ").map((item, index) => {
      class2type["[object " + item + "]"] = item.toLowerCase();
    })

    if (value == null) {
        return value + "";
    }
    return typeof value === "object" || typeof value === "function" ?
        class2type[Object.prototype.toString.call(value)] || "object" :
        typeof value;
  },
  
  /**
  * 判断是否是元素
  * @param {any} Ele
  * @returns {boolean}
  */
  isElement (Ele) {
    return !!(Ele && Ele.nodeType === 1);
  },

  /**
  * 判断是否是数组or类数组
  * @param {any} arr
  * @returns {boolean}
  */
  isArrayLike (arr) {
    // arr 必须有 length属性
    var length = !!arr && "length" in arr && arr.length;
    var typeRes = type(arr);

    // 排除掉函数和 Window 对象
    if (typeRes === "function" || (arr != null && arr === arr.window)) {
        return false;
    }

    return typeRes === "array" || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in arr;
  },
  /**
  * 金额格式化
  * @param {string} money
  * @returns {string}
  */
  formatCash (money) {
    return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    
    // 方法二
    // return money.split('').reverse().reduce((prev, next, index) => {
    //   return ((index % 3) ? next : (next + ',')) + prev
    // })
  },

  /**
  * 字符串中指定字符是否超过n位，只传字符串则返回一个对象，
  * @param {string} string
  * @param {string} chat
  * @param {number} num
  * @returns {(boolean|object|string)} 返回对象 字符串 或一个布尔值
  */
  chatCount (string = '', chat = null, num = 0) {
    let str2num = {}
    const typefn = (strx) => { return Object.prototype.toString.call(strx).slice(8,-1).toLocaleLowerCase() }
    if (typefn(string) !== 'string') {
        return string
    }
    if (string.length < 2) {
        return { string: 1 }
    }
    for (let i = 1, l = string.length; i <= l; i++) {
        if (string.charAt(i) in str2num) {
            str2num[string.charAt(i)]++
        } else {
            str2num[string.charAt(i)] = 1
        }
    }
    if (typefn(chat) !== 'null' && (chat in str2num)) {
        return str2num[chat] >= num
    } else {
        return str2num
    }
  },
}
