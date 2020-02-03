class HistoryRouter {
    constructor () {
        // 需要监听的内容，当前的路径
        this.current = null
    }
}

class vueRouter {
    constructor (options) {
        // options是实例化传给new VueRouter(options)的对象参数
        this.mode = options.mode || 'hash'
        this.routes = options.routes || []
        this.routesMap = this.createMap(this.routes)
        this.history = new HistoryRouter
        this.init()
    }

    init () {
        if (this.mode === 'hash') {
            // 如果路径没有带#则自动加上
            location.hash ? '' : location.hash = '/'
            // hash监听
            window.addEventListener('load', () => {
                this.history.current = location.hash.slice(1)
            })
            window.addEventListener('hashchange', () => {
                this.history.current = location.hash.slice(1)
            })
        }
    }

    createMap (routes) {
        return routes.reduce((memo, currentObj) => {
            memo[currentObj.path] = currentObj.component
            return memo
        }, {})
    }
}

vueRouter.install = function (Vue) {
    // 添加一个自定义变量 installed 防止重复注册
    if (vueRouter.install.installed) return
    vueRouter.install.installed = true
    
    // 通过 mixin 为每个组件安装具体逻辑
    Vue.mixin({
        beforeCreate () {
            // 首先判断实例化时 $options 是否包含 router，如果包含也就意味着是一个带有路由配置的实例被创建了，此时才有必要继续初始化路由相关逻辑
            if (this.$options && this.$options.router) {
                // 然后给当前组件实例赋值 _router，这样在访问原型上的 $router 的时候就可以得到 router 了
                this._root = this
                this._router = this.$options.router

                // 监听 this._router.history 对象里的 current
                Vue.util.defineReactive(this, 'current', this._router.history)
            } else {
                // 如果不是根组件，就赋值为父组件的_root
                this._root = this.$parent._root
            }
            Object.defineProperty(this, "$route", {
                get () {
                    return this._root._route
                }
            })
        }
    })

    Vue.component('router-view', {
        renden (h) {
            let current = this._self._root._router.history
            let routesMap = this._self._root._router.routesMap
            return h(routesMap[current])
        }
    })
}

export default vueRouter