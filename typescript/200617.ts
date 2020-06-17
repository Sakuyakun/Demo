// 泛型 字母代表的含义 规范
// E - Element (在集合中使用)E是对各方法中的泛型类型进行限制，以保证同一个对象调用不同的方法时，操作的类型必定是相同的。
// T - Type，T代表在调用时的指定类型。会进行类型推断
// K - Key（键）
// V - Value（值）
// N - Number（数值类型）

// keyof 是做什么的
interface Foo{
  name: string
  age: number
}
type T = keyof Foo // keyof取key 相当于 type T = "name" | "age"

// in 是做什么的
type Keys = "a" | "b"
type Obj = {
  [P in Keys]: any // in遍历 相当于 type Obj = { a: any; b: any }
}

function fn1 (val: Obj): void {}

class Car {
  color: string
  size: string
}
// keyof 和 in 一起用
type Paratial<T> = {
  [P in keyof T]?: T[P]
}
type CarParatial = Paratial<Car>
let aaa: CarParatial = {}

// ---------------record---------------
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

type MyRecord<K extends keyof any, T> = {
  [P in K]: T
}
type dailyTask = {
  task1: string;
  task2: string;
}
type otherTask = MyRecord<'lastTask' | keyof dailyTask, string>
var a: otherTask = {
  task1: 'do something',
  task2: 'do something',
  lastTask: 'do something'
}

// 通过 Record 将属性K对应的T类型转换为U类型
function mapObject<K extends number | string, T, U> (
  obj: Record<K, T>, // 利用record快速创建type
  changeType: (x: T) => U
): Record<K, U> {
  let newObj = {} as Record<K, U>
  Object.keys(obj).map(key => {
    newObj[key] = changeType(obj[key])
  })
  return newObj
}
mapObject(
  {val1: 'a', val2: 'bb', val3: 'ccc'},
  str => str.length
)

// ---------------Pick---------------
// 从T中取出一系列的K属性
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
type O3 = MyPick<{a: number, b: number}, 'b'> // O3 = { b: number }

// ---------------Omit---------------
// 与pick相反，忽略指定属性
type MyOmit<T, K> = Pick<T, Exclude<keyof T, K>>
type O4 = MyOmit<{a:number, b:number}, 'b'> // O4 = { a: number }

// ---------------Exclude---------------
// 如果T是U的子类型，那么返回string否则返回number
type example1<T, U> = T extends U ? 'string' : 'number'

// 从T中找出U没有的元素
type MyExclude<T, U> = T extends U ? never : T
type O1 = MyExclude<"a" | 10, "a" | "b" | "c"> // O1 = 10
// type O =
//   | ('a' extends 'a' | 'b' | 'c' ? never : 'a')
//   | (10 extends 'a' | 'b' | 'c' ? never : 10)

// ---------------Extract---------------
// 从T中找出U存在的元素
type MyExtract<T, U> = T extends U ? T : never
type O2 = MyExtract<"a" | 10, "a" | "b" | "c"> // O2 = 'a'

// ---------------ReturnType---------------
function f1(s: string) {
  return { a: 1, b: s };
}
class C {
  x = 0;
  y = 0;
}
type T10 = ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void
type T12 = ReturnType<(<T>() => T)>;  // {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T15 = ReturnType<any>;  // any
type T16 = ReturnType<never>;  // any

// other
type T04 = NonNullable<string | number | undefined>  // string | number
