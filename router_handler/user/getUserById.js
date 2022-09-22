// 根据id获取用户信息路由的处理函数

// 导入数据库连接对象
const db = require('../../db/index')

module.exports = (req, res) => {
    let id = req.query.id !== 'undefined'? req.query.id : req.user.id
    // sql:根据id查询用户
    const sql = 'select * from ev_users where id=? and isdelete=0'
    db.query(sql, id, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(400,err.message)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc(400,'查询当前登录用户信息失败，请稍后重试!')
        // 登录成功：将除密码外的所有信息返回给客户端
        const {password,isdelete,...userInfo} = results[0] 
        // 响应客户端
        res.cc(200,'获取当前登录用户信息成功',userInfo)
    })
}