// 获取用户列表路由的处理函数

// 导入数据库连接对象
const db = require('../../db/index')

module.exports = (req, res) => {
    // 获取到搜索参数
    const {query,pagenum,pagesize} = req.query
    // 定义sql
    const sql = `select * from ev_users where nickname like '%${query}%' and isdelete=0 ORDER BY role asc,id asc limit ${(pagenum-1)*pagesize},${pagesize}  `
    db.query(sql, function (err, results1) {
        // 执行 SQL 语句失败
        if (err) return res.cc(400,'获取用户列表数据失败')
        // 查询成功
        // 将查询结构中的密码和isdelete剔除
        results1.forEach(item => {
            delete item.password
            delete item.isdelete
        })
        const sql = `select count(*) total from ev_users where nickname like '%${query}%' and isdelete=0`
        db.query(sql,function (err, results2) {
            // 执行 SQL 语句失败
            if (err) return res.cc(400,'获取用户列表数据失败')
            // 执行成功，将数据返回
            res.cc(200,'获取用户列表数据成功',{
                total:results2[0].total,
                pagenum:pagenum,
                userList:results1
            })
        })
    })
    
}