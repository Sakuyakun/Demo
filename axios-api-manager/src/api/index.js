// 管理 API 路由

import login from './login'
import shop from './shop'
import serverfn from '../request/getRequest'

// 用 parseRouter 方法处理后可 serverRequest.login.loginIn() 调用
serverfn.parseRouter('login', login)
serverfn.parseRouter('shop', shop)

export default serverRequest