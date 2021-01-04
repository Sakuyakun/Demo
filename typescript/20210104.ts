
interface SearchFun {
  (source: string, subString: string): boolean
}
let mySearch:SearchFun = function (src, sub) {
  let result = 1 ? true : false
  return result
}

//=======================

interface ClockInterface {
  tick()
}
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface
}
class DigitalClock implements ClockInterface {
  constructor (h: number, m: number) {}
  tick () {}
}
function createClock (ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute)
}
let digital = createClock(DigitalClock, 12, 14)

interface a {
  val1: number;
  val2?: number
}
interface b {
  val3: number
}
interface Sum extends a, b {
  count: number;
  content: string
}


//=======================

interface User {
  name: string;
  age: number;
}
interface Role {
  name: string;
  level: number;
}
function getDataList<T> (url: string, params: T): void {
  // ...
}
getDataList<User>('xxx/api/user', { name: 'awda', age: 12 })

// =======================


let obj: User = {
  name: 'awdawd',
  age: 12
}
function getProperty<T, K extends keyof T>(obj: T, name: K): T[K] {
  return obj[name]
}
let myName: String = getProperty(obj, 'name')

