const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  const fsPath = __dirname + pathname
  fs.access(fsPath, fs.constants.R_OK, (err) => {
    if (err) {
      res.writeHead(404)
      return res.end()
    }

    // 分析文件返回fs.Stats类 http://nodejs.cn/api/fs.html#fs_class_fs_stats
    const file = fs.statSync(fsPath)

    const lastModified = file.mtime.toUTCString()
    const ifModifiedSince = req.headers['if-modified-since']

    const maxAgeTime = 3

    if (ifModifiedSince && lastModified == ifModifiedSince) {
      res.writeHead(304)
      res.end()
    } else {
      // 异步地读取一个文件的全部内容
      fs.readFile(fsPath, (err, file) => {
        if (err) {
          throw err
        } else {
          res.writeHead(200, {
            "Cache-Control": 'max-age=' + maxAgeTime,
            "Last-Modified": lastModified
          })
          res.end(file)
        }
      })
    }
  })
}).listen(3001, '127.0.0.1', () => {
  console.log('访问index.html: http://127.0.0.1:3001/index.html')
})
