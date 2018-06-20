import axios from 'axios'

const http = axios.create({
  baseURL: '',
  timeout: 30000
})

let pending = []
let CancelToken = axios.CancelToken
let removePending = (config, f) => {
  let flagUrl = config.url + '&' + config.method
  if (pending.indexOf(flagUrl) !== -1) {
    if (f) {
      f() // 执行取消操作
    } else {
      pending.splice(pending.indexOf(flagUrl), 1) // 把这条记录从数组中移除
    }
  } else {
    if (f) {
      pending.push(flagUrl)
    }
  }
}

http.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.cancelToken = new CancelToken(c => {
        removePending(config, c)
      })
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  response => {
    if (response.config.method === 'post') {
      removePending(response.config)
    }
    return response
  },
  error => {
    pending = []
    return { data: { error: error } }
  }
)

export default http
