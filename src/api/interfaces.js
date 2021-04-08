import http from '@/plugins/flyio/request'
const { cartUrl, wxUrl, userUrl, indexUrl, rootUrl } = CONFIG;
const miniAppType = 9; //1公众号 2 微商城小程序 3 推单助手小程序 4商标管家 5合伙人B  8.链科

const interfaces = {

  miniAppType,

	/**
   * 创建ajax头部信息
   */
	createAuthHeader() {
    const token = wx.getStorageSync('key');
    const sessionId = wx.getStorageSync('sessionId');
    const header = {};
    if (token) {
      header['Authorization'] = token;
      header['cookie'] = 'user_token=' + token + ';';
    }
    if (sessionId) {
      header['MiniAppSessionId'] = sessionId;
    }
    header['MiniAppType'] = miniAppType;
    return header;
  },

  /**
   * 获取session
   */
  async getSession(code) {
    const url = `${wxUrl}/weixin/miniApp3/getMiniAppSessionId.do`;
    const data = await http.post(url, {code, miniAppType});
    return data;
  },

  /**
   * 解密用户数据，获取openid
   */
  async decodeUserInfo(miniAppSessionId, encryptedData, iv) {
    const url = `${wxUrl}/weixin/miniApp3/decodeUserInfo.do`;
    const data = await http.post(url, {
      miniAppType,
      miniAppSessionId,
      encryptedData,
      iv
    });
    return data;
  },

  /**
   * 设置有效的sessionId
   */
  async setValidSession() {
    const res = await WXP.login();
    const sessionRes = await this.getSession(res.code);
    console.log(sessionRes)
    wx.setStorageSync('sessionId', sessionRes.miniAppSessionId);
    return sessionRes;
  },

  /**
   * 获取accesstoken
   */
  async getWxAccessToken(miniAppType, miniAppSessionId) {
    const url = `${wxUrl}/weixin/miniApp2/getWxAccessToken.do`;
    const data = await http.post(url, {miniAppType, miniAppSessionId});
    if (data.code === 0) {
    	wx.setStorageSync('accessToken', data.accesstoken);
    }else{
    	wx.setStorageSync('accessToken', '');
    }
    return data;
  },

  /**
   * 解密用户手机号
   */
  async decodePhoneNumber(miniAppSessionId, encryptedData, iv) {
    const url = `${wxUrl}/weixin/miniApp3/decodePhoneNumber.do`;
    const data = await http.post(url, {miniAppType: this.miniAppType, miniAppSessionId, encryptedData, iv});
    return data;
  },

  /**
   * 获取用户手机号
   */
  async getPhoneNumber(e) {
    const sessionId = wx.getStorageSync('sessionId');
    let phoneData = await this.decodePhoneNumber(sessionId, e.mp.detail.encryptedData, e.mp.detail.iv);
    return phoneData.phoneNumber;
  },

  /**
  * 用户主动点击的授权
  */
  async getUserInfoByUser(data) {
    // 解密
    let userInfo = await this.decodeUserInfo(wx.getStorageSync('sessionId'), data.encryptedData, data.iv);
    // 存储用户信息
    this.syncStore(userInfo);
    return userInfo;
  },

  // 判断用户各项授权
  async getAuthSetting(authName) {
    let res = await WXP.getSetting();
    console.log(res);
    return !!res.authSetting['scope.' + authName];
  },

  async reLogin() {
  	try {
  		wx.removeStorageSync('auth');
      wx.removeStorageSync('key');
      wx.removeStorageSync('sessionId');
		} catch(e) {
		}
    let sessionRes = await this.setValidSession(); // 登录获取code,再取得sessionId,并存储
    if (sessionRes.memberDto) {
      // 已登录（已授权已绑定）
      this.syncStore(sessionRes);
      sessionRes.isLogin = true;
    }else{
      // 未登录（未授权 或 已授权但未绑定）
      sessionRes.isLogin = false;
      wx.removeStorageSync('auth');
      wx.removeStorageSync('key');
    }
    return sessionRes;
  },

  async checkLogin() {
  	let sessionRes = {}
  	if (!wx.getStorageSync('sessionId')) {
  		sessionRes = await this.reLogin()
  		return sessionRes;
  	}
    try {
      // 检查用户微信登录状态
      await WXP.checkSession();
      sessionRes.isLogin = !!wx.getStorageSync('auth');
    } catch (e) {
    	sessionRes = await this.reLogin()
    }
    return sessionRes;
  },

  // 缓存用户数据和token
  syncStore(data){
    let memberDto = data.memberDto;
    let sessionId = data.miniAppSessionId;
    if (memberDto) {
      wx.setStorageSync('auth', memberDto);
      if (memberDto.storeCode) {
        wx.setStorageSync('storeCode', memberDto.storeCode);
      }
      // key就是token 不一定存在
      if (data.memberDto.key) {
        wx.setStorageSync('key', data.memberDto.key);
      }
    }
    if (sessionId) {
      wx.setStorageSync('sessionId', sessionId);
    }
  },

  // 短信验证码
  async sms (phone, tipConfig) {
    const url = `${rootUrl}/sendCode`;
    const data = await http.get(url, {phone: phone}, {}, tipConfig);
    return data;
  },

  //登录
  async login(phone, phoneCode, memberId) {
    let miniAppSessionId = wx.getStorageSync('sessionId');
    const url = `${wxUrl}/weixin/miniApp3/bindPhoneAndLogin.do`;
    const data = await http.post(url, {miniAppType: this.miniAppType, miniAppSessionId, phone, phoneCode, memberId });
    return data;
  },

  // 开通店铺
  async openShop() {
    const url = `${indexUrl}/partner/openStore.htm`;
    const data = await http.post(url);
    return data;
  },

  // 实名认证短信验证码
  async authCode (phone) {
    const url = `${indexUrl}/partner/b/authCode.htm`;
    const data = await http.get(url, {phone});
    return data;
  },

  // 实名认证
  async realNameAuth(param, tipConfig) {
    const url = `${indexUrl}/partner/b/auth.htm`;
    const data = await http.post(url, param, {}, tipConfig);
    return data;
  },
}

export default interfaces
