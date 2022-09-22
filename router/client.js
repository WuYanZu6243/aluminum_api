// 客户路由

const express = require('express')
// 创建路由对象
const router = express.Router()

// 获取用户列表
router.get('/clientList',require('../router_handler/client/getClientList'))

module.exports = router