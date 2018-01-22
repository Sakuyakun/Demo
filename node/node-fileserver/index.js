const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const mime = require('mime')

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') return
  let fullpathname = path.join(__dirname, url.parse(req.url).pathname)
  fullpathname = decodeURIComponent(fullpathname)

  // 判断是否为目录
  if(fs.statSync(fullpathname).isDirectory()) {
    // 输出目录列表
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    fs.readdir(fullpathname, (err, files) => {
      res.write('<ul>')
      files.forEach(file => {
        let link = path.join(url.parse(req.url).pathname, file)
        res.write(`<li><a href="${link}">${file}</a></li>`)
      })
      res.end('</ul>')
    })
  } else {
    // 输出文件
    fs.readFile(fullpathname, 'binary', (err, data) => {
      if(err){
        res.writeHead(500, { 'Content-Type': 'text/plain'})
        res.end(JSON.stringify(err))
        return
      }
      res.writeHead(200, {
        'Content-Type': `${mime.getType(fullpathname)}; charset:UTF-8`
      })
      res.write(data, 'binary')
      res.end()
    })
  }
}).listen(3030, '127.0.0.1', () => {
  console.log('服务器运行在 http://127.0.0.1:3030')
})
