// 获取用户列表路由的处理函数

// 导入数据库连接对象
const db = require('../../db/index')

module.exports = (req, res) => {
    // 获取到搜索参数
    const {query,pagenum,pagesize} = req.query
    // 定义sql
    const sql = `select * from ev_clients where cName like '%${query}%' and isdelete=0 limit ${(pagenum-1)*pagesize},${pagesize}`
    db.query(sql, function (err, results1) {
        // 执行 SQL 语句失败
        if (err) return res.cc(400,'获取客户列表数据失败')
        // 查询成功
        // 获取客户数据总条数
        const sql = `select count(*) total from ev_clients where cName like '%${query}%' and isdelete=0`
        db.query(sql,function (err, results2) {
            // 执行 SQL 语句失败
            if (err) return res.cc(400,'获取客户列表数据总数失败')
            // 执行成功，将数据返回
            res.cc(200,'获取用户列表数据成功',{
                total:results2[0].total,
                pagenum:pagenum,
                clientList:results1
            })
        })
    })
    
}