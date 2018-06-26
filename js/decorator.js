export function actionDecorator(target, propertyKey, descriptor) {
  const oldValue = descriptor.value
  descriptor.value = async function (...args) {
    try {
      Toast.loading('加载中')
      const result = await oldValue.apply(this, args)
      Toast.hide()
      return result
    } catch (err) {
      Toast.hide()
      Toast.error('访问出错,请重试')
      return null
    }
  };
  return descriptor
}

@action
@actionDecorator
actionA = async () => {
  const resp = await apiFetch()
  this.data = resp
}
