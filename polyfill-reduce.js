export default function polyfillReduce() {
  if (Array.prototype.reduce) return null

  function reduce (callback, initialValue) {
    var accumulator
    var start = 0
    if (initialValue) {
      accumulator = initialValue
    } else {
      accumulator = this[0]
      start = 1
    }
    for (var i = start; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this)
    }
    return accumulator
  }

  Array.prototype.reduce = reduce
}
