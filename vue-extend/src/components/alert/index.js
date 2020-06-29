// https://juejin.im/post/5c515e626fb9a049c84fdf4f

import Vue from 'vue'
import AlertComponent from './alert.vue'

// 通过Vue.extend将组件包装成一个子类
const AlertConstructor = Vue.extend(AlertComponent)

let alert = undefined

AlertConstructor.prototype.close = function () {
  if (alert) alert = undefined

  this.visible = false

  setTimeout(() => {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.$destroy()
  }, 300)
}

const AlertInstance = (options = {}) => {
  if (alert) return alert

  // 通过构造函数初始化组件 相当于 new Vue()
  const instance = new AlertConstructor({
    el: document.createElement('div'),
    data: {
      ...options
    }
  })
  
  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.visible = true
  })

  alert = instance
  return alert
}

export default AlertInstance