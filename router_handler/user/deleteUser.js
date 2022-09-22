// 删除用户路由处理函数

// 导入数据库连接对象
const db = require('../../db/index')

module.exports = (req, res) => {
    // 获取用户信息
    const id = req.params.id
    // sql:根据id查询用户
    const sql = 'select * from ev_users where id=? and isdelete=0'
    db.query(sql, id, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(400, err.message)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc(400, '删除失败')
        // 判断要删除的角色是啥，不能删除超级管理员
        if (results[0].role === 1) return res.cc(400, '超级管理员账号不能删除')
        // 删除的不是超级管理员
        // sql:根据id删除用户
        const sql = `UPDATE ev_users SET isdelete=1 WHERE id=${results[0].id}`
        db.query(sql, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.cc(400, err.message)
            // 执行 SQL 语句成功
            res.cc(200, '删除用户成功')
        })
    })

}
