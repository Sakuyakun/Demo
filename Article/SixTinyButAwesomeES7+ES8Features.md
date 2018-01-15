https://davidwalsh.name/es7-es8-features

### String.prototype.padStart/padEnd

```js
''.padStart(10, 'Hi') // 'HiHiHiHiHi'

// Some text
'def'.padStart(6, 'abc') // 'abcdef'
'def'.padStart(9, 'abc') // 'abcabcdef'

// Only use what gets to length
'5678'.padStart(7, '1234') // '1235678'

// padEnd(desiredLength, textToAppend)

'23'.padEnd(8, '0') // '23000000'
```

### Object.entries

将对象转为一个数组格式`([key, value])`的枚举属性对，可用于遍历

```js
// Object literal
Object.entries({ 'a': 'A', 'b': 'B' }); // [["a","A"],["b","B"]]

// String
Object.entries('david') // [["0","d"],["1","a"],["2","v"],["3","i"],["4","d"]]

//for
const obj = { 'a': 'A', 'b': 'B' }
for (let [key, value] of entries(obj)) {
  console.log(key, value); // ['a', 'A'], ['b', 'B']
}
```

### Object.values

获取一个数组格式的对象属性值，可用于遍历

```js
Object.values({ 'a': 23, 'b': 19 }) // [23, 19]
```

### Array.prototype.includes

类似 indexOf ，但返回的是 ture false

```js
['a', 'b', 'c'].includes('a') // true, not 0 like indexOf would give
['a', 'b', 'c'].includes('d') // false
```

### Exponentiation

快速求幂方法

```js
// 2 to the power of 8
Math.pow(2, 8) // 256

// ..becomes
2 ** 8 // 256
```

### Trailing Commas

最后一位带逗号不会出错，多个逗号会被 length 统计

```js 
let myObj = { a:'b', b: 'c', } // No error!

let myArr = [1, 2, 3, ] // No error!

[1, 2, 3,].length // 3
[1, 2, 3, , , ].length // 5
```
