// 编辑用户信息路由处理函数

// 导入数据库连接对象
const db = require('../../db/index')

module.exports = (req, res) => {
    // 获取客户端发送过来的数据
    const id = req.params.id
    const userInfo = req.body
    // sql:根据id修改用户信息
    const sql = `UPDATE ev_users SET nickname='${userInfo.nickname}',phone='${userInfo.phone}',wechat='${userInfo.wechat}' WHERE id=${id} And isdelete=0`
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(400,err.message)
        // 执行 SQL 语句成功
        // 响应客户端
        res.cc(200,'编辑成功')
    })
}
