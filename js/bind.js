const scop1 = {
  name: 'saku'
}
const name = 'global'

function fn(age) {
  console.log('name', this.name)
  console.log('age', age)
  return {
    name: this.name,
    age
  }
}

Function.prototype.bind = function (newThis, ...args) {
  const _self = this
  const nofunc = function () {}
  const resultFunc = function (..._args) {
    return _self.apply(this instanceof _self ? this : newThis, [...args, ..._args])
  }
  nofunc.prototype = _self.prototype
  resultFunc.prototype = new nofunc()
  return resultFunc
}

var result = fn.bind(scop1)
result.prototype.name = 'Lsc'
var person = new result(22)
