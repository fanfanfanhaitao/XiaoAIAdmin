module.exports = {
  clientId: 'efa87842c625b2657dfc', // github的clientId
  clientSecret: '42a2761074255ad53d96ec8e4891d7c64225189a', // github的cclientSecret
  msgKey: 'c32cc2c0ea084c9db36d9243041078f1', // 短信发送的key
  emailPass: 'sbeuragamphhbidf', // 发送邮件的pass
  scope: ['user'],
  secret: 'lpwq1225',
  accessKeyId: 'LTAIX30SSLbiVE9J', // 阿里云短信key
  secretAccessKey: 'ZIcnc8kgZKpa6nkOuaEaKFKmLj8W1g', // 阿里云短信accessKey
  whitePath: ['/','/users/login', '/users/phoneLogin','/users/githubLogin','/api/users/githubLogin','/users/register','/users/githubUser', '/users/captcha', '/users/sendMsg',
    '/users/findPwd','/users/logout',/^\/api/, /\.(jpg|jepg|gif|png)$/], // 忽略验证的接口
}
