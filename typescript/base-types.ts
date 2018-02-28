let value1: boolean = false;

let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;

// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;

let notANumber: number = NaN;
let infinityNumber: number = Infinity;

let content:string = 'some content';
function consoleSomething(val: string): void {
  console.log(`${val} from function`)
}
consoleSomething(content)

let val: undefined = undefined
let person: null = null

// 任意值
let anything: any = 'xxx' // let anything
anything = 2; // work

// 联合类型
let NumOrString: number | string;
NumOrString = 1
NumOrString = 'xxx'