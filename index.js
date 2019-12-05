const Koa = require('koa')
const app = new Koa();
const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router')

app.use(bodyParser());



let user = require('./appApi/user.js')
let upload = require('./appApi/upload')


//装载所有子路由
let router = new Router();
router.use('/user', user.routes())
router.use('/upload', upload.routes())
// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods());


;(async ()=>{
    await connect();
    initSchemas()
})()



app.listen(8888, () => {
    console.log('server success')
})