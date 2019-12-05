const Koa = require('koa')
const app = new Koa(); 
const { connect, initSchemas} = require('./database/init.js')
const mongoose = require('mongoose')

;(async ()=>{
    await connect();
    initSchemas()
    const User = mongoose.model('User')
    let oneUser = new User({ userName: 'zhangjie4', password:"aaa123456"})
    oneUser.save().then(()=>{
        console.log('插入成功')
    })
    let user = await User.findOne({})
    console.log(user)
})()
app.use(async(ctx)=>{
        ctx.body ='<h1>Hello</h1>'
})

app.listen(8888,()=>{
    console.log('server success')
})