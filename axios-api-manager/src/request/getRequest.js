import server from './server'
import qs from 'qs'

function realTypeof (val, type) {
  return Object.prototype.toString.call(val) === `object ${type}`;
}

function serverfn () {
  this.server = server
  this.nowHandle = null
}

serverfn.prototype.parseRouter = function (name, urlObj) {
  let ob = this[name] = {}
  Object.keys(urlObj).forEach(item => {
    ob[item] = this.sendMes.bind(this, name, item, urlObj[item])
    ob[item].state = 'ready'
  })
}

// 在组件里调用 this.serverRequest.currComponentIs(this)
// 传入 this 即可知道当前要操作的是哪个组件
serverfn.prototype.currComponentIs = function (vueOB) {
  this.nowHandle = vueOB
  return this
}

// moduleName:模块名 name:模块下单个接口属性名
serverfn.prototype.sendMes = function (moduleName, name, url, config) {
  let bindName = config.bindName || ''
  let type = config.type || 'get'
  let data = config.data || {}
  let self = this

  let addData = function (bindValue) {
    self[moduleName][name].state = 'ready'
    if (bindName === '') return false

    if (realTypeof(this.nowHandle, 'Null')) {
      throw new Error('必须先调用 currComponentIs 绑定 this 才可填充数据')
      return false
    }
    
    // 由于调用了 currComponentIs 所以得知当前操作的组件
    // 如果传入 bindName 则请求成功后的回调就自动填充组件内指定的值
    if (realTypeof(bindName, 'String')) {
      self.nowHandle[bindName] = bindValue
    }
    if (realTypeof(bindName, 'Object')) {
      let bindNameKeys = Object.keys(bindName)
      if (bindNameKeys.length === 0) return false
      bindNameKeys.forEach(key => {
        self.nowHandle[key] = bindValue[key]
      })
    }
  }

  let success = config.success || function () {}
  let error = config.error || function () {}

  let state = {
    get: function () {
      let urlqs = `${url}?${qs.stringify(data)}`
      server.get(urlqs).then(function (res) {
        success(res, addData)
      }).catch(err => {
        error(err)
      })
    },
    post: function () {
      server.post(url, data).then(function (res) {
        success(res, addData)
      }).catch(err => {
        error(err)
      })
    }
  }

  if (self[moduleName][name].state === 'ready') {
    self[moduleName][name].state = 'pending'
    state[type]()
  }

  
}

export default new serverfn()