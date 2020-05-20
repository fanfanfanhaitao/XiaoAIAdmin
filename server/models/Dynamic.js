const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DynamicSchema = new Schema({
  // 发布人
  username: {
    type: String,
    required: true
  },
  // 发布时间
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  // 动态内容
  dynamic: {
    type: String,
    required: true
  },
  // 动态分类
  classification: {
    type: String,
    required: true
  },
  // 汇报人
  reportUsers: {
    type: Array
  }
})

module.exports = User = mongoose.model('Dynamic', DynamicSchema)
