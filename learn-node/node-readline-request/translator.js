const program = require('commander')
const Table = require('cli-table2')
const superagent = require('superagent')
const API = 'http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1'

// commander 初始化
program
  .allowUnknownOption()
  .version('0.0.1')
  .usage('translator <cmd> [input]')

// commander 自定义命令
program
  .command('query')
  .description('翻译输入')
  .action(word => {
    superagent
      .get(API)
      .query({q: word})
      .end((err, res) => {
        if (err) {
          console.log('plz try again')
          return false
        }
        let data = JSON.parse(res.text)
        let result = {}

        console.log(data)
        if(data.basic){
          result[word] = data['basic']['explains']
        }else if(data.translation){
          result[word] = data['translation']
        }else {
          console.error('error')
        }

        // 输出表格
        let table = new Table()
        table.push(result)
        console.log(table.toString())
      })
  })

program
  .command('about')
  .description('说明')
  .action(word => {
    console.log('通过有道词典翻译英文')
  })

if (!process.argv[2]) {
  program.help()
}

program.parse(process.argv)
