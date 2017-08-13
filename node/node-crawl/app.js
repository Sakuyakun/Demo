const express = require('express')
const cheerio = require('cheerio')
const superagent = require('superagent')
const restc = require('restc')
const app = express()

const error = {
  emptyPageDate : {
    error: '需要传文章日期参数'
  }
}

app.use(restc.express());

app.get('/3dm/newslist', (req, res, next) => {
  superagent.get('http://www.3dmgame.com/')
    .end(function (err, sres) {
      if (err) {
        return next(err)
      }
      const $ = cheerio.load(sres.text)
      let items = []
      $('.conCon .c-2 li a').each((idx, element) => {
        let $element = $(element)
        items.push({
          title: $element.text(),
          href: $element.attr('href')
        })
      })
      res.send(items)
    })
})

app.post('/3dm/newsdata', (req, res, next) => {
  let {pagedate} = req.query
  if (pagedate === undefined) {
    res.send(error.emptyPageDate)
    return next()
  }

  let saurl = 'http://www.3dmgame.com/news/' + pagedate + '.html'
  superagent.get(saurl)
    .end(function (err, sres) {
      if (err) {
        return next(err)
      }
      const $ = cheerio.load(sres.text)
      let items = []
      $('.miaoshu').each((idx, element) => {
        let $element = $(element)
        items.push({
          content: $element.text()
        })
      })
      res.send(items)
    })
})

app.listen(3006,() => {
  console.log('app is listening at port 3006')
});
