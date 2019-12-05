const Router = require('koa-router')

let router = new Router()

router.get('/',async(ctx)=>{
    ctx.body = '这个是用户操作首页'
})

router.get('/register',async(ctx)=>{
    ctx.body = '这个是用户注册'
})

router.post('/auth',async(ctx)=>{
    console.log(ctx.request.body)

    ctx.body = {
        code: 0,
        message: '请求成功',
        data:'nihao',
    }
})

module.exports = router