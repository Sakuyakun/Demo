// 组合式（构造函数继承+原型链继承）
// function inheritPrototype (_sub, _super) {
//   _sub.prototype = new _super()
//   _sub.prototype.construtor = _sub 
// }

// 寄生组合式
function inheritPrototype (_sub, _super) {
  let prototype = Object.create(_super.prototype)
  prototype.construtor = _sub
  _sub.prototype = prototype
}

function SuperFn () {
  // ...
}
function SubFn () {
  SuperFn.call(this)
}

inheritPrototype(SubFn, SuperFn)

const example = new SubFn()

