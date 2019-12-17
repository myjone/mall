const Koa = require('koa')
const app = new Koa();
const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router')
const cors = require('koa2-cors')
app.use(bodyParser());
let user = require('./appApi/user')
let upload = require('./appApi/upload')

//let image = require('./appApi/image')

//装载所有子路由
let router = new Router();
app.use(cors())
router.use('/user', user.routes())
router.use('/upload', upload.routes())
router.use('/image', upload.routes())
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