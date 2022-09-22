// 更换头像路由的处理函数

// 导入path模块
const path = require('path')
// 导入解析FormData包
const formidable = require('formidable')
// 导入数据库连接对象
const db = require('../../db/index')
// 导入环境包config
const config = require('config')
// 导入删除文件模块
let fs = require('fs')

module.exports = (req,res)=>{
    // 当前用户的id
    let id = req.user.id
    // 创建表单解析对象
    const form = new formidable.IncomingForm()
    // 配置上传文件的存放路径
    form.uploadDir = path.join(__dirname,'../../public/uploads')
    // 保留文件的扩展名
    form.keepExtensions = true
    // 解析表单
    form.parse(req,(err,fields,files)=>{
        // err是错误对象
        // fields 保存普通表单数据
        // files 保存上传文件相关数据
        // img._writeStream.path.split('public')[1]时从files中分解出的最需要用的路径
        // 相对存放路径
        const tmp_path = files.file._writeStream.path.split('public')[1].replace(/\\/g,'/')
        // 新头像的访问路径
        let url = config.get('url') + tmp_path
        // 处理数据库
        let sql = `select user_pic from ev_users where id=${id} and isdelete=0`
        db.query(sql,(err,results)=>{
            // 执行 SQL 语句失败
            if (err) return res.cc(400,err)
            // 执行 SQL 语句成功:删除旧头像静态文件,将新头像的访问路径保存到数据库中
            // 数据库中旧头像的文件名
            const picName = results[0].user_pic.split('uploads/')[1]
            // 判断是否是默认的图片，如果是默认的图片就不要删除
            if(picName && picName !== 'user_head.png'){
                // 真正删除public/uploads文件夹中的图片
                fs.unlink(path.join(__dirname,'../../public/uploads',picName),(err)=>{
                    if (err) throw err;
                }); 
            }
            // 将新头像访问路径保存到数据库中
            let sql = `UPDATE ev_users SET user_pic = '${url}' WHERE id = ${id}`
            db.query(sql, (err, results) => {
                // 执行 SQL 语句失败
                if (err) return res.cc(400,err)
                // 执行 SQL 语句成功
                res.cc(200,'更换头像成功')
            })
        })
        
    })
}