// 切换用户状态路由处理函数

// 导入数据库连接对象
const db = require('../../db/index')

module.exports = (req, res) => {
    // 获取用户信息
    const id = req.params.id
    const type = req.params.type
    // sql:根据id查询用户
    const sql = 'select * from ev_users where id=? and isdelete=0'
    db.query(sql, id, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(400, err.message)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc(400, '删除失败')
        // 判断要切换状态的角色是啥，不能切换超级管理员的状态
        if (results[0].role === 1) return res.cc(400, '不能更改超级管理员的状态')
        // 切换状态的角色不是超级管理员
        // sql:根据id切换用户的状态
        const sql = `UPDATE ev_users SET state=${type} WHERE id=${results[0].id} and isdelete=0`
        db.query(sql, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.cc(400, err.message)
            // 执行 SQL 语句成功
            res.cc(200, '切换用户状态成功')
        })
    })

}