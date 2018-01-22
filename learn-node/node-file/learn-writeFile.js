const fs = require('fs')
const path = require('path')

// fs.writeFile
// file 文件名或文件描述符
// data 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象
// options 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8，模式为 0666，flag 为 'w'，*如果是一个字符串，则它指定了字符编码
// callback 回调函数

fs.writeFile('file.txt', 'content changed from node', {flag: 'a+'}, err => {
 if (err) throw err
 console.log('文件内容追加修改成功')
})

// options 参数中 flag
// r	以读取模式打开文件。如果文件不存在抛出异常。
// r+	以读写模式打开文件。如果文件不存在抛出异常。
// rs	以同步的方式读取文件。
// rs+	以同步的方式读取和写入文件。
// w	以写入模式打开文件，如果文件不存在则创建。
// wx	类似 'w'，但是如果文件路径存在，则文件写入失败。
// w+	以读写模式打开文件，如果文件不存在则创建。
// wx+	类似 'w+'， 但是如果文件路径存在，则文件读写失败。
// a	以追加模式打开文件，如果文件不存在则创建。
// ax	类似 'a'， 但是如果文件路径存在，则文件追加失败。
// a+	以读取追加模式打开文件，如果文件不存在则创建。
// ax+	类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。

// -----------------------

// fs.open
// fs.open('file.txt', 'r+', (err, fd) => {
//    if (err) {
//        return console.error(err)
//    }
//   console.log("文件打开成功")
// })

// -----------------------

// fs.read
// fd 通过 fs.open() 方法返回的文件描述符
// buffer 是数据将被写入到的 buffer
// offset 是 buffer 中开始写入的偏移量
// length 是一个整数，指定要读取的字节数
// position 是一个整数，指定从文件中开始读取的位置。 如果 position 为 null，则数据从当前文件位置开始读取
// callback 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象

const buf = Buffer.alloc(1024)
fs.open('file.txt', 'r+', (err, fd) => {
  if (err) throw err
  fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
    if (err) throw err
    console.log(bytes + "  字节被读取")
    // 仅输出读取的字节
    if(bytes > 0){
       console.log(buf.slice(0, bytes).toString())
    }
  })
})

// -----------------------

// 递归同步遍历目录
function travelSync(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const pathname = path.join(dir, file)
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback)
    } else {
      callback(pathname)
    }
  })
}
// travelSync('folder', (pathname) => {
//   console.log(pathname)
// })

// 递归异步遍历目录
function travel(dir, callback) {
  fs.readdir(dir, 'utf-8', (err, fileArr) => {
    if(err) throw err
    fileArr.forEach(file => {
      const pathname = path.join(dir, file)
      fs.stat(pathname, (err, stats) => {
        if(err) throw err
        if(stats.isDirectory()) {
          travel(pathname, callback)
        } else {
          callback(pathname)
        }
      })
    })
  })
}
travel('folder', (pathname) => {
  console.log(pathname)
})
