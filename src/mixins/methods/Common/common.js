const { payUrl, indexPath } = CONFIG;
import API from '@/api'
export default {
  // 检查是否登录绑定，若未登录则跳转授权或绑定手机页面，并同时标记页面来源，便于重新绑定手机后的页面跳转
  async checkLoginAndMark() {
    let query = this.$root.$mp.query;
    let sessionRes = await this.API.interfaces.checkLogin();
    console.log('sessionRes:',sessionRes)
    // 已登录(拾贝登录)
    if (sessionRes.isLogin) {
      return true
    }
    // true 已授权但未绑定  false 未授权
    let isAuth = await this.API.interfaces.getAuthSetting('userInfo');
    // markFrom不传值，默认为授权页面调用，所以不处理
    if (!isAuth) {
      return false;
    }
    // this.$router.replace({path: '/pages/login/login'});
    console.log('isAuth:', isAuth)
    return isAuth;
  },
  // 微信支付
  wechatPay (orderSn, paymentSn, success, fail) {
    let self = this;
    let paymentBody = {};
    paymentBody.orderSn = orderSn;
    paymentBody.paymentSn = paymentSn;
    paymentBody.paymentType = 1; //支付方式1:公众号支付，2：小程序支付，不传默认1
    paymentBody.openid = self.$storage.get('sessionId');
    let token = self.$storage.get('key');
    let sessionId = self.$storage.get('sessionId');
    let url = payUrl + '/order/wxpayment';
    wx.request({
      url: url,
      method: 'POST',
      data: paymentBody,
      header: {
        ...API.interfaces.createAuthHeader(),
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      /*{
        'Authorization': token,
        'SessionId': sessionId,
      },*/
      success(res){
        console.log(res)
        let data = res.data;
        if (data.status && data.status !== 200) {
          self.$message({content: data.msg, type: 'error' })
          fail && fail(res);
          return;
        }
        let ret = {};
        ret.timeStamp = data.timeStamp;
        ret.nonceStr = data.nonceStr;
        ret.package = data.package;
        ret.signType = data.signType;
        ret.paySign = data.paySign;
        wx.requestPayment({
          ...ret,
          success (res) {
            console.log('支付成功');
            success && success(res);
          },
          fail (e) {
            console.log('支付失败');
            fail && fail(e);
          }
        })
      },
      fail(err){
        console.log('调用微信支付：', err);
        fail && fail(err);
      }
    });
  },
  redirect() {
    if (this.$router.currentRoute.path == indexPath) {
      return;
    }
    this.$router.replace(indexPath);
  },
  judgeIsPhoneX () {
    let flag = false;
    wx.getSystemInfo({
      success: res => {
        if (res.model.indexOf('iPhone X') != -1) {
          flag = true;
        }
      }
    });
    return flag;
  }
}
