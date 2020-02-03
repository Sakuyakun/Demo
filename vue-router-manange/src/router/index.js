import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// router.js 检测某一个文件夹内匹配的文件
let _r = require.context('../components', true, /\.router\.js/)
let routerArr = []
_r.keys().forEach(path => {
  // path 为每个匹配到的文件的路径 ./model1/model1.router.js
  // 传入到 _r 自身加载模块，返回的是每个router.js模块 export 的结果
  // 然后拼接到 routerArr 中
  routerArr = routerArr.concat(_r(path).default)
})

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  ...routerArr
]

const router = new VueRouter({
  routes
})

export default router
