// 深合并数组
const deepFlatten = arr => {
  return [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v));
};

// 返回两个数组之间的差异值
const difference = (a, b) => {
  const b_set = new Set(b)
  return a.filter(x => !b_set.has(x))
};

const symmetricDifference = (a, b) => {
  const set_a = new Set(a);
  const set_b = new Set(b);

  return [
    ...a.filter(x => !set_b.has(x)),
    ...b.filter(x => !set_a.has(x))
  ]
}

// 返回数组的所有不同值
const distinctValuesOfArray = arr => [...new Set(arr)];

// 返回数组中的随机元素
const sample = arr => arr[Math.floor(Math.random() * arr.length)];

// 随机数组值的顺序
const shuffle = arr => arr.sort(() => Math.random() - 0.5);

// 返回两个数组中都显示的元素的数组
const similarity = (arr, values) => arr.filter(v => values.includes(v));

// 去重
const unique = arr => arr.filter((item, index, array) => array.indexOf(item) === index);
const unique_2 = arr => [...new Set(arr)];

// 数组最大值
const maxval = arr => arr.reduce((prev, next) => Math.max(prev, next))
const maxval_2 = arr => Math.max(...arr)



