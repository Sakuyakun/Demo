const http = require('http')
const fs = require('fs')
const crypto = require("crypto")

const hashStr = 'hash string'
const hash = require("crypto").createHash('sha1').update(hashStr).digest('base64');

const router = (function(){
  const route = {
    GET: {},
    POST: {}
  }

  return {
    get (url, callback) {
      route.GET[url] = {
        callback,
        lastModified: new Date().toUTCString()
      }
      return this
    },
    post (url, callback) {
      route.POST[url] = {
        callback,
        lastModified: new Date().toUTCString()
      }
      return this
    },
    listen (req, res) {
      if (route[req.method] && route[req.method][req.url]) {
        route[req.method][req.url].callback(req, res, route[req.method][req.url]['lastModified'])
      } else {
        res.writeHead(404)
        res.write('404')
        res.end()
      }
    }
  }
})();

// 第一步：新鲜度检测 Cache-Control 与 Expires （200）
// 第二步：资源二次校验 请求头 If-None-Match 对比响应头 ETag，请求头 If-Modified-Since 对比响应头 Last-Modified （304）
router.get('/', (req, res, lastModified) => {
  console.log('router: /')
  res.end()
}).get('/page1', (req, res, lastModified) => {
  // 客户端会提供给服务器一个 If-Modified-Since 请求头，其值为服务器上次返回的 Last-Modified 响应头中的日期值。
  // 还会提供一个 If-None-Match 请求头，值为服务器上次返回的 ETag 响应头的值
  // 服务器会读取到这两个请求头中的值，判断出客户端缓存的资源是否是最新的。
  // 如果是的话，服务器就会返回 HTTP/304 Not Modified 响应，但没有响应体，客户端收到 304 响应后，就会从缓存中读取对应的资源
  const lastModifiedSince = req['headers']['if-modified-since']
  const ifNoneMatch = req['headers']['if-none-match']

  // 先校验etag 后校验last-modify
  if (ifNoneMatch && ifNoneMatch === hash || lastModifiedSince && lastModified === lastModifiedSince) {
    res.writeHead(304);
    return res.end();
  }

  res.writeHead(200, {
    'Expires': new Date(+new Date(lastModified) + 30000).toUTCString(), // HTTP/1.0
    'Cache-Control': 'max-age=30', // HTTP/1.1
    'Etag': hash, // 模拟 hash，实际情况中当文件修改时 hash 值改变
    'Last-Modified': lastModified,
  })
  res.end('done')
})

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(404)
    return res.end()
  }

  // log
  let out = fs.createWriteStream('./log.txt')
  out.write(`请求方法：${req.method} \n`)
  out.write(`请求URL：${req.url} \n`)
  out.write(`请求头对象：${JSON.stringify(req.headers, null, 4)} \n`)
  out.write(`请求HTTP版本：${req.httpVersion} \n`)

  router.listen(req, res)
}).listen(3000, '127.0.0.1', () => {
  console.log('服务器运行在 http://127.0.0.1:3000')
});
