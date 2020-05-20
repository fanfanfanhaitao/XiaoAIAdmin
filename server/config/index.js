module.exports = {
    clientId: 'efa87842c625b2657dfc', // github的clientId
    clientSecret: '8db90fa85a8d55ca4d0d78b14e79e05746c2a116', // github的cclientSecret
    msgKey: 'c32cc2c0ea084c9db36d9243041078f1', // 短信发送的key
    emailPass: 'bnaueillbrzxbdib', // 发送邮件的pass
    scope: ['user'],
    secret: 'fht857923726', //token
    accessKeyId: 'LTAI4G1Tmmz53hQHXpvNjzQ4', // 阿里云短信key
    secretAccessKey: 'lfruRGVaIjUSl4pjf6DivrnWITPO5o', // 阿里云短信accessKey
    whitePath: ['/', '/users/login', '/users/register', '/users/captcha', '/users/sendMsg',
        '/users/findPwd', '/users/logout', /^\/api/, /\.(jpg|jepg|gif|png)$/
    ], // 忽略验证的接口
}