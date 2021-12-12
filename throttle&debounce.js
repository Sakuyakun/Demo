
// 节流
// 每x毫秒内最多只执行一次fn

function throttle (fn, wait) {
  let timer = null
  return function () {
    let _this = this
    let args = arguments
    if (!timer) {
      timer = setTimeout(function(){
        timer = null
        fn.apply(_this, args)
      }, wait)
    }
  }
}

// 防抖
// x毫秒后执行事件，如果再次触发则重新计时

function debounce (fn, wait) {
  let timer = null

  return function () {
    let _this = this
    let args = arguments

    if (timer) clearTimeout(timer)

    let callNow = !timer

    timer = setTimeout(() => {
      fn.apply(_this, args)
    }, wait)
    if (callNow) fn(args)
  }
}
