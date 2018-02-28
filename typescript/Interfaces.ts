interface Person {
  readonly name: string;
  age: number;
  sex?: string
}
const ME: Person = {
  name: 'saku',
  age: 25
}

// Error Example
// 一旦定义了任意属性，确定属性和可选属性都必须是它的子属性
// 任意属性必须是 number 类型，而 sex 却是 string
// interface Person {
//   name: string;
//   age: number;
//   sex?: string;
//   [propName: number]: number;
// }
// const ME: Person = {
//   name: 'saku',
//   age: 25,
//   sex: 'male'
// }

