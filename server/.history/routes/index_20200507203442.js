const router = require('koa-router')()
const Calendar = require('../models/Calendar')
const User = require('../models/User')
const Dynamic = require('../models/Dynamic')
const path = require('path')
const dayjs = require('dayjs')
const Mock = require('mockjs')

const arr = ['成都分公司', '北京分公司', '上海分公司', '哈尔滨公司', '微易', '郑州公司', '测试部门', '财务部', '地州区', '盒马项目组', '成都区', '贵州区', '电商部', '综合管理部', '全民营销项目组', '单团部', '新销售业务部', '欧洲组', '中东非组', '票务组', '外联部', '西南总经理办公室', '市场营销部', '单团计调部', '票务部', '南亚计调部', '欧洲散拼计调部', '签证部', '东南亚事业部', '产品组', '途牛组', '携程组', '其他电商组', '资料组', '运营支持组', '京津组', '河北组', '太原公司', '内蒙古组']
const treeData = require('./tree')
const url = ['https://www.baidu.com', 'https://juejin.im/', 'https://www.douban.com/', 'https://github.com/']


// 获取日程
router.get('/calendar', async ctx => {
  let res = await Calendar.find()
  if (res.length > 0) {
    ctx.body = {
      code: 200,
      msg: 'success',
      data: res
    }
  } else {
    ctx.body = {
      code: 500,
      msg: '暂无日程',
      data: null
    }
  }
})

// 添加日程
router.post('/calendar', async ctx => {
  let newSchedule = new Calendar(ctx.request.body)
  let res = await newSchedule.save()
  if (res) {
    ctx.body = {
      code: 200,
      msg: '添加日程成功',
      data: newSchedule
    }
  } else {
    ctx.body = {
      code: 500,
      msg: '添加日程失败',
      data: null
    }
  }
})

// 删除日程
router.post('/delCalendar', async ctx => {
  let id = ctx.request.body.id
  let res = await Calendar.findByIdAndRemove(id)
  if (res) {
    ctx.body = {
      code: 200,
      msg: '删除成功'
    }
  } else {
    ctx.body = {
      code: 500,
      msg: '删除失败'
    }
  }
})

// 重复上周
router.post('/repeatDynamic', async ctx => {
  let { currentDay } = ctx.request.body
  let lastDay = dayjs(currentDay).subtract(7, 'days').format('YYYY-MM-DD')
  let res = await Calendar.find({
    currentDay: lastDay
  })
  if (res.length > 0) {
    let obj = {}
    for (let i = 0; i < res.length; i++) {
      let item = res[i]
      obj.currentDay = currentDay
      obj.startTime = item.startTime
      obj.endTime = item.endTime
      obj.schedule = item.schedule
      obj.users = item.users
      let newItem = new Calendar(obj)
      let result = await newItem.save()
      if (result) {
        ctx.body = {
          code: 200,
          msg: 'success',
          data: res
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '暂无数据',
          data: null
        }
      }
    }
  }
})

router.post('/upload/image', async ctx => {
  let id = ctx.session.user._id
  let file = ctx.request.files.file
  let basename = path.basename(file.path)
  let url = `${ctx.origin}/uploads/${basename}`
  let res = await User.findByIdAndUpdate(id, {
    avatar: url
  })
  if (res) {
    ctx.body = {
      code: 200,
      url: `${ctx.origin}/uploads/${basename}`,
      msg: '上传成功'
    }
  }
})

// 发布动态
router.post('/addDynamic', async ctx => {
  let newDynamic = new Dynamic(ctx.request.body)
  let res = await newDynamic.save()
  if (res) {
    ctx.body = {
      code: 200,
      msg: '添加动态成功',
      data: newDynamic
    }
  } else {
    ctx.body = {
      code: 500,
      msg: '添加动态失败',
      data: null
    }
  }
})

// 获取动态
router.get('/getDynamic', async ctx => {
  let res = await Dynamic.find()
  if (res.length > 0) {
    ctx.body = {
      code: 200,
      msg: 'success',
      data: res
    }
  } else {
    ctx.body = {
      code: 500,
      msg: '暂无数据',
      data: null
    }
  }
})

// 首页进度条数据
router.get('/progress', async ctx => {
  let list = [
    {
      name: '本月营收',
      money: 87643,
      value: 23,
      id: 1
    },
    {
      name: '待回款',
      money: 54540,
      value: 11,
      id: 2
    },
    {
      name: '客单价/合同',
      money: 17800,
      value: 89,
      id: 3
    }
  ]
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data: list
  }
})

router.get('/cityValue', async ctx => {
  ctx.body = Mock.mock({
    code: 200,
    msg: '获取成功',
    'data|40': [
      {
        city: '@city',
        value: '@integer(0,100)'
      }
    ]
  })
})

router.get('/report', async ctx => {
  ctx.body = Mock.mock({
    code: 200,
    msg: 'success',
    'data|20': [
      {
        id: '@increment(1)',
        name: '@cname(2,4)'
      }
    ]
  })
})


router.get('/question', async ctx => {
  ctx.body = Mock.mock({
    code: 200,
    msg: 'success',
    'data|30': [
      {
        id: '@increment(1)',
        startTime: '@date',
        endTime: '@date',
        name: '@cword(2,5)',
        desc: '@cword(2,5)',
        status: '@integer(0,2)',
        url: () => {
          let num = parseInt(Math.random() * url.length)
          return url[num]
        }
      }
    ]
  })
})

// 通讯录
router.get('/getMailList', async ctx => {
  ctx.body = Mock.mock({
    code: 200,
    msg: 'success',
    'data|100': [
      {
        id: '@increment(1)',
        name: '@cname()',
        img: '@image(80x80)',
        phone: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
        tel: /\d{3}-\d{8}|\d{4}-\d{7}/,
        email: /[1-9]\d{7,10}@(qq|163|gmail)\.com/,
        gender: '@integer(0,1)',
        qq: /[1-9]\d{7,10}/,
        department: () => {
          let num = parseInt(Math.random() * arr.length)
          return arr[num]
        }, // 部门
        position: /经理|主管|员工|实习生/, // 职位
        'tag|0-3': [{
          name: '@cword(1, 4)'
        }]
      }
    ]
  })
})

// 通讯录
router.get('/getTreeData', async ctx => {
  ctx.body = Mock.mock({
    code: 200,
    msg: 'success',
    data: treeData
  })
})


// offer
router.get('/getOffer', async ctx => {
  ctx.body = Mock.mock({
    code: 200,
    msg: 'success',
    'data|100': [
      {
        name: '@cname()',
        img: '@image(80x80)',
        phone: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
        tel: /\d{3}-\d{8}|\d{4}-\d{7}/,
        email: /[1-9]\d{7,10}@(qq|163|gmail)\.com/,
        gender: '@integer(0,1)',
        qq: /[1-9]\d{7,10}/,
        // 部门
        department: () => {
          let num = parseInt(Math.random() * arr.length)
          return arr[num]
        },
        position: /经理|主管|员工|实习生/, // 职位
        nativePlace: '@city(true)', // 籍贯
        marriage: '@integer(0,1)', // 婚姻状态
        certificates: '@cword(2,4)', // 证件类型
        certificatesNum: '@id', // 证件号码
        birthday: '@date', // 出生日期
        status: '@integer(0,4)', // 审批状态: 待发 已发 已接受 已拒绝 已入职
        age: '@integer(18,60)', // 年龄
        education: '@integer(0,6)', // 学历: 初中 高中 大专 本科 硕士 博士 博士以上
        createTime: '@date', // 入职时间
        nation: '@cword(1,5)', // 民族
        workAddress: '@city', // 工作地点
      }
    ]
  })
})

// 获取员工信息
router.get('/userInfo', async ctx => {
  ctx.body = Mock.mock({
    code: 200,
    msg: 'success',
    'data|100': [
      {
        id: '@increment(1)',
        name: '@cname()',
        num: '@integer(1000,9999)',
        mechanism: '区域中心',
        // 部门
        department: () => {
          let num = parseInt(Math.random() * arr.length)
          return arr[num]
        },
        startTime: '@date',
        endTime: '@date',
        state: '@integer(0,2)', // 审批状态: 0 审批通过 1 审批未通过 2 审批中
        position: /经理|主管|员工|实习生/, // 职位
      }
    ]
  })
})

router.get('/pay', async ctx => {
  ctx.body = Mock.mock({
    code: 200,
    msg: 'success',
    'data|3': [
      {
        name: '@cword(2,5)',
        planMoney: '@integer(0, 1000000)',
        actualMoney: '@integer(0, 1000000)',
        lastMonth: '@integer(0, 1000000)',
        thisMonth: '@integer(0, 1000000)'
      }
    ]
  })
})

module.exports = router
