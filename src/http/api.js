import service from './index'

export default {
    //验证码
    getCapt() {
        return service.get('/users/captcha')
    },
    //注册
    register(params) {
        return service.post('/users/register', params)
    },
    //发送短信验证码
    sendMsg(params) {
        return service.post('/users/sendMsg', params)
    },
    //登录    
    login(params) {
        return service.post('/users/login', params)
    },
    //手机登录
    phoneLogin(params) {
        return service.post('/users/phoneLogin', params)
    },
    //找回密码
    findPwd(params) {
        return service.post('/users/findPwd', params)
    },
    //获取菜单
    getMenus() {
        return service.get('/users/menus')
    },

    //修改密码
    updatePwd(params) {
        return service.post('/users/updatePwd', params)
    },
    //退出登录
    logout() {
        return service.get('users/logout')
    },
    //进度条
    progress() {
        return service.get('/progress')
    },
    //.首页利润
    cityValue() {
        return service.get('/cityValue')
    },
    //获取动态
    getDynamic() {
        return service.get('/getDynamic')
    },
    //发布动态
    addDynamic(params) {
        return service.post('/addDynamic', params)
    },
    //动态汇报人
    report() {
        return service.get('/report')
    },
    //问卷
    question() {
        return service.get('/question')
    },
    //通讯录部门
    getTreeData() {
        return service.get('/getTreeData')
    },
    //获取通讯录
    getMailList() {
        return service.get('/getMailList')
    },
    //获取offer
    getOffer() {
        return service.get('/getOffer')
    },
    //获取员工信息
    getUser() {
        return service.get('/userInfo')
    },
    //薪酬信息
    getPay() {
        return service.get('/pay')
    },
    //添加日程
    addCalendar(params) {
        return service.post('/calendar', params)
    },
    //获取日常
    getCalendar() {
        return service.get('/calendar')
    },
    //删除日程
    delCalendar(params) {
        return service.post('/delCalendar', params)
    },
    //重复上周
    repeatDynamic(params) {
        return service.post('/repeatDynamic', params)
    }




}