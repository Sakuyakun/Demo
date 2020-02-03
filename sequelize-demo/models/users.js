const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../core/db')

class User extends Model { }

// 定义模型
User.init({
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  username: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'users', // 表名
  timestamps: false
})

module.exports = User