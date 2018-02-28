class Person {
  public name: string;
  public age: number;

  public constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class ExportInfo extends Person {
  constructor(name: string, age: number) {
    super(name, age);
  }
  getInfo() {
    console.log(this.name, this.age)
  }
}
const obj = new Person('saku', 18)


abstract class Animal {
  public name: any;
  public constructor(name: any) {
    this.name = name
  }
  public abstract baseinfo(): string;
}
class Cat extends Animal {
  public baseinfo(): string {
    return `Animal: Cat, Name: ${this.name}`
  }
}
const cat: Animal = new Cat('Tan');
const info = cat.baseinfo(); // -> Animal: Cat, Name: Tan

 // 泛型
function createArray<T>(length: number, value: T): Array<T>{
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
createArray<string>(3, 'x')
createArray(4, 1)


function swap<T, U>(arr: [T, U]): [U, T] {
  return [arr[1], arr[0]]
}
swap([1, 2]) // -> [2, 1]

// 泛型约束
// 只允许这个函数传入那些包含 length 属性的变量
interface Lengthwise {
  length: number;
}
function printSomething<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg;
}

function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id];
  }
  return target
}

// 接口利用泛型定义
interface CreateArrayFunc{
  <T>(length: number, value: T): Array<T>;
};

let createArrayFunc: CreateArrayFunc;
createArrayFunc = function <T = number>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i <= length; i++) {
    result[i] = value
  }
  return result
}
