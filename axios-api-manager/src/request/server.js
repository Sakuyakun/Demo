import axios from 'axios'

let server = axios.create({
  baseURL: 'http://localhost: 9002',
  timeout: 5000
})

let getTokenByLocal = () => {
  return sessionStorage.getItem('token')
}

server.interceptors.request.use(
  config => {
    if (getTokenByLocal()) {
      config.headers['token'] = getTokenByLocal()
      config.headers['ContentType'] = 'application/json;charset=utf-8'
    }
  },
  error => {
    Promise.reject(error)
  }
)

server.interceptors.response.use(
  response => {
    let res = response.data
    // 请求结果错误处理
    if (res.code === '401') { }
    if (res.code === '402') { }

    return Promise.resolve(response.data)
  },
  error => {
    return Promise.reject(error)
  }
)

export default server