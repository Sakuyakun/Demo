const dom = {
  on: function (element, eventType, selector, fn) {
    element.addEventListener(eventType, event => {
      let el = event.target;

      // 向上遍历获取有指定selector的element
      while(!el.matches(selector)){
        if (element === el) {
          el = null
          break
        }
        el = el.parentNode
      }

      el && fn.call(null, event, el)
    })

    return element
  },
  
  // 获取传入的dom在父元素下的位置
  index: function (element) {
    let siblings = element.parentNode.children;
    for (let i = 0, len = siblings.length; i < len; i++) {
      if (element == siblings[i]) {
        return i
      }
    }
    return -1
  },

  // 给指定元素添加class值
  uniqueClass: function (element, classname) {
    dom.every(element.parentNode.children, el => {
      el.classList.remove(classname)
    })
    element.classList.add(classname);
    return element
  },

  every: function (nodeList, fn) {
    for (var i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i])
    }
    return nodeList
  }
}