module.exports = {
    clientId: 'efa87842c625b2657dfc', // github的clientId
    clientSecret: '8db90fa85a8d55ca4d0d78b14e79e05746c2a116', // github的cclientSecret
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
