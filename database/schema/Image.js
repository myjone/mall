const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
//创建UserSchema
const imageSchema = new Schema({
    ImageId: ObjectId,
    //unique:表示的是不重复
    src: {type: String},
    url: String,
    type: { type: String,default:'banner'},
    createTime: { type: Date, default: Date.now() },
    updateTime: { type: Date, default: Date.now() },
})
// 映射表 这边的User要和数据库中的表名一致 两次User是为了防止mongoose表名带s
mongoose.model('Image', imageSchema, 'Image')