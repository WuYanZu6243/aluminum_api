// 这里书写一些配置代码

// 优化 res.send() 代码
exports.optimizeSend = (req, res, next)=>{
    // 状态码,状态描述,数据
    res.cc = function (status,msg,data=null) {
      res.send({
        // 数据
        data,
        // 状态信息
        meta:{
            // 状态码
            status,
            // 状态描述
            msg
        }
      })
    }
    next()
}

// 加密、解密token的钥匙
exports.jwtSecretKey = '小布丁^_^'