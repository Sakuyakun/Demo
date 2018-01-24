const readline = require('readline')
const http = require('http')
const cheerio = require('cheerio')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'search >>> '
})

rl.prompt()
rl.on('line', line => {
  search(line.trim(), () => {
    rl.prompt()
  })
}).on('close', line => {
  console.log('see you next time')
  process.exit(0)
})

function search(words, callback) {
  const options = {
    hostname: 'www.baidu.com',
    port: 80,
    path: `/s?wd=${encodeURI(words)}`,
    method: 'GET'
  }

  const req = http.request(options, res => {
    // console.log(`STATUS: ${res.statusCode}`) //返回状态码
    // console.log(`HEADERS: ${JSON.stringify(res.headers, null, 4)}`) // 返回头部
    res.setEncoding('utf8')
    let body = ''
    res.on('data', chunk => {
      body += chunk
    })
    res.on('end', () => {
      let $ = cheerio.load(body)
      $('.t a').each(function(i, el){
          console.log($(this).text(), $(this).attr('href'),'\n')
      })
      callback()
    })
  })
  req.end()
}
