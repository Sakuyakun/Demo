class MyPromise {
  constructor (executor) {
    this.state = 'pending'
    this.data = undefined
    this.reason = undefined
    this.onFulfilledCallback = []
    this.onRejectedCallback = []

    let resolve = (val) => {
      if (this.state === 'pending') {
        this.state = 'resolve'
        this.data = val
        this.onFulfilledCallback.forEach(callback => callback())
      }
    }

    let reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'reject'
        this.reason = reason
        this.onRejectedCallback.forEach(callback => callback())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then (onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.data)
    } else if (this.state === 'rejected') {
      onRejected(this.data)
    } else if (this.state === 'pending') {
      this.onFulfilledCallback.push(() => { onFulfilled(this.data) })
      this.onRejectedCallback.push(() => { onRejected(this.reason) })
    }
  }
}

MyPromise.prototype.All = function (promises) {
  let list = []
  let count = 0

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(res => {
        list[index] = res
        count++
        if (count === promises.length) {
          resolve(list)
        }
      }, err => {
        reject(err)
      })
    })
  })
}