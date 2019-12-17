const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
router.post('/save', async (ctx) => {
    let Article = new mongoose.model('Image');
    let Image = new Article(ctx.request.body);
    await newArtcle.save().then((data) => {
        console.log(data + "**********************************")
        ctx.body = {
            code: 200,
            message: '添加成功',
            data: {
                messsage: 'success'
            }
        }
    }).catch((error) => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})

module.exports = router;