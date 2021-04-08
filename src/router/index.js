const homePage = require('./homePage.js')//首页
const login = require('./login.js')//授权登录
const my = require('./my.js')//个人中心
const order = require('./order.js')//个人中心


module.exports = [
  ...homePage,
  ...login,
  ...my,
  ...order
]
