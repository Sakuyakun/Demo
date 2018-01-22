const fs = require('fs')

fs.readFile('file.txt', (err, data) => {
  if(err) {
    return console.log(err)
  }
  console.log('异步读取文件：', data.toString())
})

const dataSync = fs.readFileSync('file.txt')
console.log('同步读取文件：', dataSync.toString())
