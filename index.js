const Koa = require('koa')
const app = new Koa();
const {connect}  = require('./database/init.js')

;(async ()=>{
    await connect();
})()
app.use(async(ctx)=>{
        ctx.body ='<h1>Hello</h1>'
})

app.listen(8888,()=>{
    console.log('server success')
})