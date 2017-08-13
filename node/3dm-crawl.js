const express = require('express')
const cheerio = require('cheerio')
const superagent = require('superagent')
const restc = require('restc')
const app = express()

app.use(restc.express());
app.get('/3dmdata', (req, res, next) => {
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

app.listen(3006,() => {
  console.log('app is listening at port 3006')
});
