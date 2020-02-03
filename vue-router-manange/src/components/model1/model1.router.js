let _r = require.context('./pages', true, /\.vue/)
let routerArr = []
_r.keys().forEach(path => {
    let _key = path.split('.')
    if (_key.indexOf('index') !== -1) {
        routerArr.push({
            path: `${_key[1]}`,
            component: _r(path).default
        })
    } else {
        routerArr.push({
            path: `${_key[1]}/${_key[2]}`,
            component: _r(path).default
        })
    }
})

export default routerArr