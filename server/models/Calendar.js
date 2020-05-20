const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CalendarSchema = new Schema({
  // 参与人
  users: {
    type: Array,
    required: true
  },
  // 开始时间
  startTime: {
    type: Date,
    required: true
  },
  // 结束时间
  endTime: {
    type: Date,
    required: true
  },
  // 日程内容
  schedule: {
    type: String,
    required: true
  },
  // 当前日期
  currentDay: {
    type: String,
    required: true
  }
})

module.exports =  mongoose.model('Calendar', CalendarSchema)
