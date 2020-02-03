const Router = require('koa-router')
const UsersModel = require('../models/users')

const validator = require('validator')
const md5 = require('md5-node')

const router = new Router()

//添加前缀
router.prefix('/api/users')

router.get('/', async ctx => {
  ctx.body = '主页'
})

router.post('/register', async ctx => {
  // 请求后往数据库添加用户名密码
  let { username, password } = ctx.request.body
  
  // 用户名密码校验
  if (validator.isEmpty(username) || validator.isEmpty(password)) {
    return ctx.body = {
      status: 2,
      message: '用户名和密码不能为空'
    }
  }

  // 用户名是否存在
  const nameExist = await UsersModel.findOne({
    where: {
      username
    }
  })
  if (nameExist) {
    return ctx.body = {
      status: 2,
      message: '用户名已经存在'
    }
  }

  // 通过后使用 model 操作数据库添加
  password = md5(password)
  await UsersModel.create({ username, password })

  return ctx.body = {
    status: 1,
    message: '注册成功'
  }
})

module.exports = router