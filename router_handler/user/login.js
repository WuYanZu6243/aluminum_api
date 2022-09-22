// 用户登录路由处理函数

// 导入数据库连接对象
const db = require('../../db/index')
// 导入加密/解密密码库
const bcrypt = require('bcryptjs')
// 导入生产token令牌的包
const jwt = require('jsonwebtoken')
// 导入配置文件中加密、解密token的钥匙
const {jwtSecretKey} = require('../../config')

module.exports = (req, res) => {
    // 获取客户端发送过来的数据
    const userInfo = req.body
    // sql:根据用户名查询用户
    const sql = `select * from ev_users where username=? and isdelete=0`
    db.query(sql, userInfo.username, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(400,err.message)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc(400,'登录失败')
        // 判断当前用户的状态是否为启用
        if(!results[0].state) return res.cc(400,'用户已停用')
        // 判断用户输入的登录密码是否和数据库中的密码一致
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) return res.cc(400,'用户名或密码错误!')
        // 登录成功：根据用户信息生成 Token 字符串
        // 剔除用户的敏感信息
        const user = { ...results[0], password: '', user_pic: ''}
        // 生成 Token 字符串
        const tokenStr = jwt.sign(user, jwtSecretKey, {
            expiresIn: '10h' // token 有效期为 10 个小时
        })
        // 响应客户端
        res.cc(200,'登录成功',{
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr
        })
    })
}
