// 此模块用于创建连接mysql数据库的实例

const mysql = require('mysql')

// 导入环境包config
const config = require('config')

// 创建数据库连接对象
const db = mysql.createPool({
    host:config.get('db.host'),
    user:config.get('db.user'),
    password:config.get('db.password'),
    database:config.get('db.database')
})

// 向外共享数据库连接对象
module.exports = db