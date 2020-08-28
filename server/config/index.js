module.exports = {
    clientId: '', // github的clientId
    clientSecret: '', // github的cclientSecret
    msgKey: '', // 短信发送的key
    emailPass: '', // 发送邮件的pass
    scope: ['user'],
    secret: '', //token
    accessKeyId: '', // 阿里云短信key
    secretAccessKey: '', // 阿里云短信accessKey
    whitePath: ['/', '/users/login', '/users/register', '/users/captcha', '/users/sendMsg',
        '/users/findPwd', '/users/logout', /^\/api/, /\.(jpg|jepg|gif|png)$/
    ], // 忽略验证的接口
}
