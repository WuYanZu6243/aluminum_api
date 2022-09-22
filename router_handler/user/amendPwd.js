// 修改用户密码路由处理函数

// 导入数据库连接对象
const db = require('../../db/index')
// 导入加密/解密密码库
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {
    // 获取客户端发送过来的数据
    const id = req.params.id
    const userPwd = req.body
    // 判断两次输入的新密码是否一致
    if(userPwd.newPwd !== userPwd.affirmNewPwd) return res.cc(400,'两次输入的新密码不一致')
    // sql:根据用户名查询用户
    const sql = `select * from ev_users where id=? and isdelete=0`
    db.query(sql,id,function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(400,err.message)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc(400,'修改密码失败')
        // 判断用户输入的旧密码是否和数据库中的密码一致
        const compareResult = bcrypt.compareSync(userPwd.oldPwd, results[0].password)
        // 如果对比的结果等于 false, 则证明用户输入的旧密码错误
        if (!compareResult) return res.cc(400,'旧密码错误,修改密码失败')
        // 比对成功，可以修改密码
        // 将新密码加密
        userPwd.affirmNewPwd = bcrypt.hashSync(userPwd.affirmNewPwd, 10)
        // 操作数据库，新密码替换旧密码
        const sql = `UPDATE ev_users SET password='${userPwd.affirmNewPwd}' WHERE id=${results[0].id} And isdelete=0`
        db.query(sql, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.cc(400,err.message)
            // 执行 SQL 语句成功
            // 响应客户端
            res.cc(200,'修改密码成功')
        })
    })
}
