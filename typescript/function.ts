// 函数声明
function SumFunctionDeclaration(x: number, y: number): number {
  return x + y
}

const SubFunctionExpression = function (x:number, y:number): number {
  return x + y
}

// 函数表达式
const Subfe1: (x:number, y:number) => number = function (x:number, y:number) : number {
  return x + y
}
// or 
interface SubInterface {
  (x: number, y: number): number;
}
let Subfe2: SubInterface;
Subfe2 = function (x:number, y:number) {
  return x + y
}

/**
 * 可选参数例子
 * ps: 可选参数后面不允许再出现必须参数
 * 
 * @param {string} [firstName='liu'] 
 * @param {string} [lastName]
 * @returns {string} 
 */
function buildName(firstName: string = 'liu', lastName?: string): string {
  if (lastName) return `${firstName}-${lastName}`
  return firstName
}

let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');

/**
 * 扩展运算符例子
 * 
 * @param {any[]} array 
 * @param {...any[]} items 
 */
function push(array: any[], ...items: any[]) {
  items.forEach(function(item){
    array.push(item)
  })
}
let a:any[] = []
push(a, 1, 2, 3)
console.log(a)

/**
 * number reverse 
 * 
 * @param {number} x 
 * @returns {number} 
 */
function reverse(x: number): number;
/**
 * string reverse
 * 
 * @param {string} x 
 * @returns {string} 
 */
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') 
    return Number(x.toString().split('').reverse().join(''));
  if (typeof x === 'string') 
    return x.split('').reverse().join('')
}
