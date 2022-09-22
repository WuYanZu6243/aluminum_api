// 用户路由

const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { reg_login_schema,reg_editUser_schema,reg_amendPwd_schema } = require('../schema/user')

// 用户登录路由
router.post('/api/login',expressJoi(reg_login_schema),require('../router_handler/user/login'))

// 更换头像路由
router.post('/changePic',require('../router_handler/user/changePic'))

// 根据id获取用户信息路由
router.get('/user',require('../router_handler/user/getUserById'))

// 编辑用户
router.put('/user/:id',expressJoi(reg_editUser_schema),require('../router_handler/user/editUser'))

// 修改用户密码
router.put('/amendPwd/:id',expressJoi(reg_amendPwd_schema),require('../router_handler/user/amendPwd'))

// 获取用户列表
router.get('/userList',require('../router_handler/user/getUserList'))

// 添加用户
router.post('/addUser',require('../router_handler/user/addUser'))

// 删除用户
router.delete('/deleteUser/:id',require('../router_handler/user/deleteUser'))

// 切换用户状态
router.put('/changeUserState/:id/state/:type',require('../router_handler/user/changeUserState'))

module.exports = router