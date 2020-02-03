// https://itbilu.com/nodejs/npm/sequelize-docs-v5.html#getting-started

const Sequelize = require('sequelize')

// 连接数据库
const Seque = new Sequelize('user_db', 'root', '12345678', {
  'dialect': 'mysql',
  'host': 'localhost',
  'port': 3306
})
Seque.authenticate().then(() => {
  console.log('connect success')
}).catch(err => {
  console.log(err)
})

// 创建 model，通过 model 操作数据库
const userModel = Seque.define('users', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },

  username: Sequelize.STRING(100),
  password: Sequelize.STRING(100)
}, {
  timestamps: false
})

// 增加数据
// userModel.create({
//   username: 'nier',
//   password: 222222
// }).then(username => {
//   console.log(`create success id: ${username.id}`)
// })

// 删除数据
// userModel.destroy({
//   where: {
//     username: 'veve'
//   }
// }).then(() => {
//   console.log('删除成功')
// }).catch(err => {
//   console.log(err)
// })

// 修改数据
// userModel.update(
//   {
//     username: 've'
//   },
//   {
//     where: {
//       username: 'veve'
//     }
//   }
// ).then(() => {
//   console.log('update success')
// })

// 查询语句
// userModel.findAll().then(res => {
//   console.log(JSON.stringify(res, null, 2))
// })

// userModel.findOne({
//   where: {
//     username: 'nier'
//   }
// }).then(res => {
//   console.log(JSON.stringify(res, null, 2))
// })
