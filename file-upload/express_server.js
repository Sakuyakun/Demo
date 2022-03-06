const express = require('express')
const multer  = require('multer')

const storage = multer.diskStorage({
  // 设置资源的保存路径
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  // 设置资源保存在本地的文件名
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
// 自定义本地保存的路径
const upload = multer({ storage: storage })

const app = express()
app.use(express.static('./src')) //使用src目录提供静态文件服务

app.post('/upload', upload.array('imgfile', 40), (req, res, next) => {
  const files = req.files
  !files[0] ? res.send('error') : res.send('success')
  console.log(files)
})

app.listen(9998, 'localhost', () => {
  console.log('server is running at port 9998...');
});