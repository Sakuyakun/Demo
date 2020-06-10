const handleError = (err) => {
  // 处理错误
  if (err.code === 401) {
    notify({
      content: '请先登录。'
    })
  }
}

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    plugins: [errorPlugin({
      onActionError: (e) => {
        handleError(e)
      }
    })]
  })
}

export const errorPlugin = (config = {}) => {
  const {
    onActionError = (e) => { throw e }
  } = config

  return function (store) {
    const oldDispatch = store.dispatch
    store.dispatch = function dispatch (...args) {
      return oldDispatch.apply(this, args).catch(e => {
        onActionError(e)
      })
    }
  }
}
