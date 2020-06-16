// 这里的箭头与箭头函数含义不相同，表示表达式右边的返回值类型
let add: (num1: number, num2: number) => number =
function (x: number, y: number): number {
  return x + y
}

// 剩余参数
function buildArr (firstItem: string, ...restOfItem: string[]): string[] {
  return [firstItem, ...restOfItem]
}

// this 参数
interface DeckIF {
  suits: string[];
  card: number[];
}
let deck = {
  suits: ['hearts', 'spades', 'clubs'],
  card: Array(52),
  createCardPick: function (this: DeckIF) {
    return () => this.suits.pop
  }
}

interface UIElementIF {
  addClickListener (onClick: (this: void, e: Event) => void): void;
  addKeyDownListener (onClick: (this: void, e: Event) => void): void;
}
class Handler {
  type: string
  onClick (this: void, e: Event) {
    console.log(e.target)
  }
  onKeydown (this: void, e: Event) {
    console.log(e.target)
  }
}
let h = new Handler()
let UIElement: UIElementIF = {
  addClickListener () {},
  addKeyDownListener () {}
}
UIElement.addClickListener(h.onClick)
UIElement.addKeyDownListener(h.onKeydown)

// 重载
let suits = ['hearts', 'spades', 'clubs', 'diamonds']

function pickCard (x: {suit: string, card: number}[]): number
function pickCard (x: number): {suit: string, card: number}
function pickCard(x): any {
  if (Array.isArray(x)) {
    let pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard
  } else if (typeof x === 'number') {
    let pickedSuit = Math.floor(x / 13)
    return { suit: suits[pickedSuit], card: x % 13 }
  }
}

let myDeck = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
]
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit)
let pickedCard2 = pickCard(15)
console.log('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit)

// 泛型--------------
interface GenericIdentityFn {
  <T>(arg: T): T
}
interface GenericIdentityFn2<T>{
  (arg: T): T
}

function identity<T>(arg: T): T {
  return arg
}

let myIdentity: GenericIdentityFn = identity
let myIdentity2: GenericIdentityFn2<number> = identity

// 泛型类--------------
class GenericNumber<T> {
  zeroValue: T
  add: (x:T, y:T) => T
}

let myGN = new GenericNumber<number>()

// 泛型约束--------------
// 至少包含 length 属性，使用 extends 关键字
interface lengthwise {
  length: number
}
function loggingIdentity<T extends lengthwise>(arg: T): T{
  console.log(arg.length)
  return arg
}

// 泛型约束--------------
// key必须是obj对象里存在的属性
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

// 类型推断--------------
// 上下文类型 TypeScript 类型检查器使用 window.onmousedown 函数的类型来推断右边函数表达式的类型。
// 没有 clickTime 属性所以报错
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.clickTime)  // Error
}

class Animal {
  numlengths: number
  name: string
  constructor(name: string) {
    this.name = name
  }
}
class Cat extends Animal {
  constructor () {
    super('cat')
  }
}
class Dog extends Animal {
  constructor () {
    super('dog')
  }
}
let group: Animal[] = [new Cat(), new Dog()]

// 交叉类型--------------
function extend<T, U> (first: T, second: U): T & U {
  let result = {} as T & U
  return result
}

class Person {
  constructor (public name: string) {}
}
class ConsoleLogger {
  constructor () {}
}
extend(new Person('tom'), new ConsoleLogger())

// 联合类型--------------
interface Bird {
  fly()
  layEggs()
}
interface Fish {
  swim()
  layEggs()
}
function getPet (): Bird | Fish {
  return {
    fly: function () {},
    layEggs: function () {}
  }
}
let pet = getPet()

function isFish(pet: Bird | Fish): pet is Fish{ // is 类型谓词
  return (pet as Fish).swim !== undefined
}

if (isFish(pet)) {
  // do something
} else {
  // do something
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '.  the ' + epithet // ok
  }
  name = name || 'Bob'
  return postfix('great')
}

fixed(null)
