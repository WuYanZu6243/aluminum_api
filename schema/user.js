// 此模块用于用户相关表单的验证规则

const joi = require('joi')

// 用户名的验证规则
const username = joi.string().alphanum().min(3).max(12).required()
// 密码的验证规则
const password = joi.string().pattern(/^[\S]{6,20}$/).required()
// 真实姓名验证规则
const nickname = joi.string().pattern(/[\u4e00-\u9fa5]/).required()
// 电话验证规则
const phone = joi.string().pattern(/^[1][3-8]+\d{9}$/).required()
// 微信号验证规则
const wechat = joi.string().pattern(/^[a-zA-Z][a-zA-Z\d_-]{5,19}$/).required()

// 登录表单的验证规则对象
exports.reg_login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
  },
}

// 编辑用户信息表单的验证规则
exports.reg_editUser_schema = {
  body: {
    nickname,
    phone,
    wechat
  }
}


//修改用户密码表单的验证规则
exports.reg_amendPwd_schema = {
  body: {
    oldPwd: password,
    newPwd: password,
    affirmNewPwd: password
  }
}

