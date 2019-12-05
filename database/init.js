const mongoose = require('mongoose')
const db = 'mongodb://111.229.37.126/mall-db'
const glob = require('glob')
const { resolve } = require('path')

exports.initSchemas =()=>{
    //引入所有的schema
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

exports.connect = ()=>{
    //链接数据库
    mongoose.set('useCreateIndex', true)
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    let maxConnectTimes =0;
    return new Promise((resolve,reject)=>{
        //增加数据库监听事件
        mongoose.connection.on('disconectd', (err) => {
            console.log('***************数据库断开**************')
            if (maxConnectTimes<=3){
                 maxConnectTimes++
                 mongoose.connect(db)
            }else{
                reject(err)
                throw new Error('数据出现问题，程序无法搞定，请人为处理')
            }
            
        })
        // 数据库出错的时候
        mongoose.connection.on('error', (err) => {
            console.log('***************数据库错误**************')
            if (maxConnectTimes <= 3) {
                maxConnectTimes++
                mongoose.connect(db)
            } else {
                reject()
                throw new Error('数据库异常')
            }
        })
        //数据库打开的时候
        mongoose.connection.once('open', () => {
            resolve();
            console.log('***************MONGODB CONNECTED SUCCESSFUL**************')
        })
    })
    
}