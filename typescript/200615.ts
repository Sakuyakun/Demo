interface Square {
  color: string;
  area: number;
}
interface SquareConfig {
  color?: string;
  width?: number;
}
function createSquara (config: SquareConfig): Square {
  let newSquare = {
    color: 'red',
    area: 100
  }

  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}
let mySquara = createSquara({
  color: 'black'
})

interface valueREADONLY {
  readonly name: string;
  readonly age: number;
}
let x: valueREADONLY = {
  name: 've',
  age: 19
}

let y: ReadonlyArray<number> = [1,2,3]
let z: number[] = y as number[]

interface SearchFunc {
  (source: string, subString: string): boolean
}
let searchsomething: SearchFunc
searchsomething = function (source: string, subString: string): boolean {
  let result = false
  // ...
  return result
}

interface StringArray {
  readonly [index: number]: string
}
let arr: StringArray
arr = ['a', 'b', 'c']
let arr0: string = arr[0]

interface ClockConstrucotr {
  new (hour: number, minute: number): ClockInterface
}
interface ClockInterface {
  tick()
}
function createClock (ctor: ClockConstrucotr, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute)
}
class digitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick () {
    console.log('beep beep')
  }
}
let digital = createClock(digitalClock, 12, 14)

interface shapeIF {
  color: string
}
interface penStrokeIF {
  penWidth: number
}
interface squareIF extends shapeIF, penStrokeIF {
  sideLength: number
}
let square = {} as squareIF
square.color = 'red'
square.sideLength = 12
square.penWidth = 34

// 混合类型
interface counterIF {
  (star: number): string;
  reset(): void;
  interval: number
}
function getCounter (): counterIF {
  let counter = (function (start: number) {
    return ''
  }) as counterIF
  counter.reset = function () {}
  counter.interval = 111
  return counter
}

// class
let passcode: number = 123123

class Employee {
  static company: string = 'ABCD'

  private _fullName: string

  get fullName (): string {
    return this.fullName
  }
  set fullName (newName: string) {
    if (passcode && passcode === 123123) {
      this._fullName = newName
    }
    else {
      console.log('passcode error')
    }
  }
}
// ----------------------------------------
class Greeter {
  static standardGreeting = 'Hello, there'
  
  greeting: string

  constructor(message?: string) {
    this.greeting = message
  }

  greet() {
    if (this.greeting) {
      return 'Hello, ' + this.greeting
    } else {
      return Greeter.standardGreeting
    }
  }
}

let greeter: Greeter
greeter = new Greeter()
console.log(greeter.greet())

// 保存 Greeter 类的构造函数
// typeof Greeter 意思是取 Greeter 类的类型，这个类型包含了类的所有静态成员和构造函数
let greeterMaker: typeof Greeter = Greeter
greeterMaker.standardGreeting = 'Hey there'

let greeter2: Greeter = new greeterMaker()
console.log(greeter2.greet())

// 把类当做接口使用
class Point {
  x: number
  y: number
}
interface Point3d extends Point {
  z: number
}
let point3d: Point3d = {x: 1, y: 2, z: 3}
