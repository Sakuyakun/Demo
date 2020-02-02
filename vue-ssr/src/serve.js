import { createApp } from './main'

export default context => {
  // context 是 node 服务器端自定义数据
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      console.log(matchedComponents)
      if (!matchedComponents.length) {
        return reject(new Error("router didn't match"))
      }
      resolve(app)
    })
  })
}
