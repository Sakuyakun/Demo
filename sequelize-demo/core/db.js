const Sequelize = require('sequelize')
const { host, port, user, password, dbName } = require('../config/index').databases

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  pool: {
    max: 5, // 最大连接数
    min: 0, // 最小连接数
    idle: 10000 // 连接空闲时间
  },
  timezone: '+08:00' //解决时差
})

sequelize.authenticate().then(() => {
  console.log('connect success')
}).catch(err => {
  console.log(err)
})

module.exports = {
  sequelize
}
