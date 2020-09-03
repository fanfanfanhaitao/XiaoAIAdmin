module.exports = {
  clientId: '', // github的clientId
  clientSecret: '', // github的cclientSecret
  msgKey: '', // 短信发送的key
  emailPass: '', // 发送邮件的pass
  scope: ['user'],
  secret: '',
  accessKeyId: '', // 阿里云短信key
  secretAccessKey: '', // 阿里云短信accessKey
  whitePath: ['/','/users/login', '/users/phoneLogin','/users/githubLogin','/api/users/githubLogin','/users/register','/users/githubUser', '/users/captcha', '/users/sendMsg',
    '/users/findPwd','/users/logout',/^\/api/, /\.(jpg|jepg|gif|png)$/], // 忽略验证的接口
}
