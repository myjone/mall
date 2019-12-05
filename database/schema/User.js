const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10
//创建UserSchema
const userSchema = new Schema({
    UserId: ObjectId,
    //unique:表示的是不重复
    userName: { unique:true, type: String },
    password: String,
    createTime: { type: Date, default: Date.now() },
    lastLoginTime: { type: Date, default: Date.now() },
})

// pre表示的是每次保存的时候
userSchema.pre('save', function (next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(this.password, salt, (err,hash)=> {
            if(err) {
                return next(err)
            }else{
                this.password = hash
                next()
            }
        })
    })
})

//发布模型
// 映射表 这边的User要和数据库中的表名一致 两次User是为了防止mongoose表名带s
mongoose.model('User', userSchema, 'User')