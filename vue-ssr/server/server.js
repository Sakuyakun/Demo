const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')

const server = express()
const path = require('path')
const fs = require('fs')

const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'))
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'))
const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})

// 设置静态目录不然打包结果文件dist/index.ssr.html里取不到app.js
server.use(express.static(path.resolve(__dirname, '../dist/client')))

server.get('*', (req, res) => {
  const context = { url: req.url }
  const ssrStream = renderer.renderToStream(context)
  // res.end 只能返回 buffer 所以将 stream 转为 buffer
  let buffers = []
  ssrStream.on('error', err => { console.log(err) })
  ssrStream.on('data', data => buffers.push(data))
  ssrStream.on('end', () => { res.end(Buffer.concat(buffers)) })
})

server.listen(8000)
