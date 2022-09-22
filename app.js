const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 导入path模块
const path = require('path')

// 开放静态资源
app.use(express.static(path.join(__dirname,'/public')))

// 配置跨域
const cors = require('cors')
app.use(cors())

// 配置解析json格式的参数
app.use(express.json())

// 导入配置代码文件config.js
const {optimizeSend,jwtSecretKey} = require('./config')
// 注册 优化res.send()
app.use(optimizeSend)

// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 配置解析 Token 的中间件,指定/api类接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 导入并注册用户路由
const userRouter = require('./router/user')
app.use(userRouter)

// 导入并注册客户路由
const clientRouter = require('./router/client')
app.use(clientRouter)

// 定义验证规则包
const joi = require('joi')
// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(400,err.message)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc(400,'token身份认证失败！')
  // 未知错误
  res.cc(400,err.message)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007)