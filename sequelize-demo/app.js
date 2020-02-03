const Koa = require('koa')
const Router = require('koa-router')
const body = require('koa-bodyparser')
const users = require('./routes/users')

const app = new Koa()
const router = new Router()
app.use(body())
app.use(users.routes(), users.allowedMethods()) // 调用路由中间件时会根据 ctx.status 返回一些设置响应头

app.listen(3030)
