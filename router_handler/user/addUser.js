// 编辑用户信息路由处理函数

// 导入数据库连接对象
const db = require('../../db/index')
// 导入加密/解密密码库
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {
    // 获取用户信息
    const info = req.body
    // 判断当前添加的用户的超级管理员，还是管理员。
    // 只有超级管理员能添加超级管理员，管理员不能添加超级管理员
    if(req.user.role !== 1){
        // 当前不是超级管理员，不能添加超级管理员
        if(info.role === 1) return res.cc(400,'您没有权限添加超级用户')
    }
    // sql:根据传进来的用户名查询数据，查看用户名是否存在
    const sql = `select * from ev_users where username=? and isdelete=0`
    db.query(sql, info.username, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(400,err.message)
        // 执行 SQL 语句成功
        // 查询到数据，说明用户名已存在，添加失败
        if (results.length > 0) return res.cc(400,'用户名已存在')
        // 用户名可用，可以添加。
        // 对密码进行加密
        info.password = bcrypt.hashSync(info.password, 10)
        // sql:添加用户到数据库
        const sql = `insert into ev_users(username,password,nickname,state,role,phone,wechat) values 
        ('${info.username}','${info.password}','${info.nickname}',${info.state},${info.role},'${info.phone}','${info.wechat}')`
        db.query(sql, info.username, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.cc(400,err.message)
            // 执行 SQL 语句成功
            res.cc(200,'添加用户成功')
        })
    })
}
