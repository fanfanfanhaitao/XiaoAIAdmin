const router = require('koa-router')()
const svgCaptcha = require('svg-captcha')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const fetch = require('node-fetch')
const { accessKeyId, secretAccessKey, emailPass, clientId, clientSecret, scope, secret } = require('../config')
const SMSClient = require('@alicloud/sms-sdk')
const smsClient = new SMSClient({ accessKeyId, secretAccessKey })
const menus = require('./menu')

router.prefix('/users')


// 图形验证码
router.get('/captcha', async ctx => {
    const cap = svgCaptcha.create({
        size: 4, // 验证码长度
        width: 106,
        height: 32,
        fontSize: 32,
        ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#87ceeb' // 验证码图片背景颜色
    })
    ctx.session.captcha = cap.text
    ctx.response.type = 'image/svg+xml'
    ctx.body = cap.data
})

// 注册
router.post('/register', async ctx => {
    let {
        username,
        password,
        sms,
        phone,
        email
    } = ctx.request.body
    let newUser = new User({
        username,
        password,
        phone,
        email
    })
    let user = await User.find({
        username
    })
    if (sms !== ctx.session.sms) {
        ctx.body = {
            code: 500,
            msg: '验证码不正确,请重新输入'
        }
    } else {
        if (user.length > 0) {
            ctx.body = {
                code: 500,
                msg: '用户已存在'
            }
        } else {
            let res = await newUser.save()
            if (res) {
                ctx.body = {
                    code: 200,
                    msg: '注册成功'
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: '注册失败'
                }
            }
        }
    }
})

// 用户名登录
router.post('/login', async ctx => {
    let { username, password, code } = ctx.request.body
    let user = await User.find({
        username,
        password
    })

    let token = jwt.sign({
        username: username
    }, secret, {
        expiresIn: '2h'
    })
    if (code.toLowerCase() === (ctx.session.captcha).toLowerCase()) {
        if (user.length > 0) {
            ctx.session.user = user[0]
            ctx.body = {
                code: 200,
                data: ctx.session.user,
                token,
                msg: '登录成功'
            }
        } else {
            ctx.body = {
                code: 500,
                data: null,
                msg: '用户不存在'
            }
        }
    } else {
        ctx.body = {
            code: 500,
            data: null,
            msg: '验证码不正确'
        }
    }
})

// 手机号登录
router.post('/phoneLogin', async ctx => {
    let { phone, code } = ctx.request.body
    let user = await User.findOne({ phone })
    if (user) {
        let token = jwt.sign({
            phone
        }, secret, {
            expiresIn: '2h'
        })
        if (code === ctx.session.sms) {
            ctx.body = {
                code: 200,
                msg: '登录成功',
                data: user,
                token
            }
        }
    } else {
        ctx.body = {
            code: 500,
            msg: '用户不存在'
        }
    }

})

// 删除用户
router.post('/delete', async ctx => {
    let id = ctx.request.body.id
    let res = await User.findByIdAndRemove(id)
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

// 修改密码
router.post('/updatePwd', async ctx => {
    let { username, password, id, newPwd } = ctx.request.body
    let user = await User.findOne({
        username,
        password
    })
    if (user) {
        if (password === newPwd) {
            ctx.body = {
                code: 500,
                msg: '新密码不能与原密码相同'
            }
        } else {
            let res = await User.findByIdAndUpdate(id, {
                username,
                password: newPwd
            })
            if (res) {
                ctx.body = {
                    code: 200,
                    msg: '修改成功'
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: '修改失败'
                }
            }
        }
    } else {
        ctx.body = {
            code: 500,
            msg: '原密码不正确,请重新输入'
        }
    }
})

// 找回密码
router.post('/findPwd', async ctx => {
    let {
        username,
        email
    } = ctx.request.body
    let user = await User.findOne({
        username: username
    })
    if (user) {
        let transporter = await nodemailer.createTransport({
            service: 'qq', // 邮箱类型
            secure: true,
            auth: {
                user: '857923726@qq.com',
                pass: emailPass
            }
        })

        let mailOptions = {
            from: '你的小可爱 857923726@qq.com', // 从哪个邮箱发送
            to: email,
            subject: '找回密码', // 标题
            text: `您用户名为${user.username}的密码是${user.password}`
                // cc: '抄送',
                // bcc: '私密发送'
        }

        // 发送邮件
        let info = await transporter.sendMail(mailOptions)
        if (!info) {
            ctx.body = {
                code: 500,
                msg: '发送失败'
            }
        } else {
            ctx.body = {
                code: 200,
                data: info,
                msg: `密码已成功发送在至您${email}的邮箱中`
            }
        }
    } else {
        ctx.body = {
            code: 500,
            msg: '用户不存在'
        }
    }
})

// 获取全部用户
router.get('/allUser', async ctx => {
    let user = await User.find()
    if (user.length > 0) {
        ctx.body = {
            code: 200,
            user,
            msg: 'success'
        }
    } else {
        ctx.body = {
            code: 500,
            user,
            msg: '用户不存在'
        }
    }
})

// 发送短信验证码
router.post('/sendMsg', async ctx => {
    let { phone } = ctx.request.body
    let code = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
    let res = await smsClient.sendSMS({
        PhoneNumbers: phone,
        SignName: '海木木涛然',
        TemplateCode: 'SMS_179290408',
        TemplateParam: '{code:' + code + '}'
    })
    if (res.Message === 'OK') {
        ctx.session.sms = code
        ctx.body = {
            code: 200,
            msg: '短信发送成功',
            data: {
                code
            }
        }
    }
})

// 退出登录
router.get('/logout', async ctx => {
    ctx.session.user = null
    ctx.body = {
        code: 200,
        msg: '退出成功'
    }
})

// github登录
router
    .get('/githubLogin', async(ctx) => {
        let dataStr = (new Date()).valueOf()
            //重定向到认证接口,并配置参数
        let path = "https://github.com/login/oauth/authorize"
        path += '?client_id=' + clientId
        path += '&scope=' + scope
        path += '&state=' + dataStr
            //转发到授权服务器
        ctx.redirect(path)
    })
    .get('/auth', async(ctx) => {
        const code = ctx.query.code
        let path = 'https://github.com/login/oauth/access_token'
        const params = {
            client_id: clientId,
            client_secret: clientSecret,
            code: code
        }
        await fetch(path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
            .then(res => {
                return res.text()
            })
            .then(body => {
                const args = body.split('&')
                let arg = args[0].split('=')
                const access_token = arg[1]
                return access_token
            })
            .then(async(token) => {
                const url = ' https://api.github.com/user?access_token=' + token
                await fetch(url)
                    .then(res => {
                        return res.json()
                    })
                    .then(res => {
                        ctx.session.githubUser = res
                            // ctx.redirect(`http://localhost:9527`)
                    })
            }).catch(e => {
                console.log(e)
            })
    })

// 获取github登录的用户
router.get('/githubUser', async ctx => {
    if (ctx.session.githubUser) {
        ctx.body = {
            code: 200,
            msg: 'success',
            data: ctx.session.githubUser
        }
    }
})

router.get('/menus', async ctx => {
    ctx.body = {
        code: 200,
        data: menus,
        msg: '获取成功'
    }
})


module.exports = router