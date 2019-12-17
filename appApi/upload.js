
/**
 * 获取七牛云Token
 * **/
const Router = require('koa-router')
const qiniu = require('qiniu')
// const tentConfig = require("../config/tentConfig")
let qiniuConfig = require('../config/qiniuConfig.js')
let router = new Router()
const getToken = () => {
    return new Promise((resolve, reject) => {
        const accessKey = qiniuConfig.accessKey
        const secretKey = qiniuConfig.secretKey
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        const options = {
            scope: 'images',
            expires: 7200, //token 过期时间 单位是秒
        }
        const putPolicy = new qiniu.rs.PutPolicy(options)
        const uploadToken = putPolicy.uploadToken(mac)
        if (uploadToken) {
            resolve(uploadToken)
        } else {
            reject('token获取失败')
        }
    })
}
router.post('/token', async (ctx) => {
    console.log(ctx)
    let uploadToken = await getToken();
    ctx.body = {
        code: 0,
        message: '请求成功',
        data: uploadToken,
    }
})

// router.post('/tentToken', async(ctx)=>{
//     console.log(ctx)
//     let data = await tentConfig.getOssKey
//     console.log(data)
//     ctx.body = {
//         code: 0,
//         message: '请求成功',
//         data: uploadToken,
//     }
// })

module.exports = router;