<template>
  <div class="login_page">
    <div v-if="show && loading" class="authorize_wrap">
      <div class="logo_box column-center">
        <img src="~assets/img/icon/logo.jpg" alt="">
        <p class="name">请先登录！</p>
        <p class="info">为了更好的体验，请先完成以下授权！</p>
      </div>
      <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" class="btn_auth">小程序授权</button>
    </div>
    <div v-if="!show && loading" class="login_wrap">
      <div class="login_form">
        <h2>登录注册</h2>
        <p class='line row-between'>
          <input type="number" class="input" placeholder-class="input-placeholder" @blur="phoneBlur" @focus="phoneFocusState = true" v-model="phone" maxlength="11">
          <b :class="phoneFocusState ? 'top' : ''">手机号码</b>
          <!-- <button class="link" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button> -->
        </p>
        <p class='line row-between'>
          <b :class="codeFocusState ? 'top' : ''">验证码</b>
          <input type="number" class="input numInput" @blur="codeBlur" @focus="codeFocusState = true" maxlength="6" v-model="token">
          <span class="link" :class="{'disabled': !preventCode, 'isOver': isOver}"  @click.stop="getCode">{{ codeText }}</span>
        </p>
        <p class="tips">温馨提示：未注册知证通的手机号，登录时将自动注册，且代表已同意<span class="link" @click="agreementShow = true">《知证通用户协议》</span></p>
        <button :class="[!phone.length||!token.length ? 'btnDisabled' : '', 'submit_btn']" :disabled="!phone.length||!token.length" @click="goLogin">登录</button>

      </div>
    </div>


    <!-- 注册协议 -->
    <reg-agreement :agreementShow="agreementShow" @hide="hideAgreeFn"></reg-agreement>

    <u-message/>

    <mptoast/>

  </div>
</template>

<script>
import mixin from 'mixins/'
import filter from 'utils/filters'
import regAgreement from 'components/agreement/regAgreement'
export default {
  mixins: [mixin],
  components: {regAgreement},
  data () {
    return {
      show: true,  //展示获取授权按钮
      phoneFocusState: false,
      codeFocusState: false,
      loading: false, // 判断是否授权前不显示页面
      postData: {},
      phone: '',
      token: '',
      codeText: '获取验证码',
      isOver: false,
      preventCode: true,
      agreementShow: false,
    }
  },
  mounted () {
    this.loading = false;
    this.initFn();
  },
  methods: {
    // 手机号失去焦点
    phoneBlur () {
      this.phoneFocusState =  this.phone.length > 0 ? true : false;
    },
    codeBlur () {
      this.codeFocusState =  this.token.length > 0 ? true : false;
      // this.token.length > 0 ? this.codeFocusState = true : this.codeFocusState = false
    },
    // 授权页面初始化
    async initFn () {
      // this.show = this.$route.query.showAuthorize==='true' ? true : false;
      let isAuth = await this.API.interfaces.getAuthSetting('userInfo');
      console.log('isAuth', isAuth)
      this.show = !isAuth;
      this.loading = true;
      if(this.show){
        wx.setNavigationBarTitle({
          title: '授权'
        });
      }
      else{
        wx.setNavigationBarTitle({
          title: '登录'
        });
      }
      // // isAuth表示是否授权 true:已授权 false:已授权
      // let isAuth = await this.checkLoginAndMark();
      // this.show = isAuth === false ? true : false;
    },
    // 回到首页
    backIndexFn () {
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
    hideAgreeFn () {
      this.agreementShow = false;
    },
    async getPhoneNumber(e) {
      console.log(e);
      let phone = await this.API.interfaces.getPhoneNumber(e);
      this.phone = phone;
    },
    // 获取验证码  判断是否有可用的手机号
    getCode () {
      let phone = this.phone;
      if (!phone.trim()) {
        this.tips('请输入手机号')
        this.checkPostData = true;
        return false;
      } else if(!/^1\d{10}$/.test(phone)){
        this.tips('请输入正确的手机号')
        this.checkPostData = true;
        return false;
      };
      if (this.preventCode) {
        this.preventCode = false;
        this.getCapcha();
      }
    },
    //向手机号发送 验证码
    async getCapcha () {
      try {
        await this.API.interfaces.sms(this.phone, {
          errorAction: true
        });
        this.timeout();
        this.$mptoast('验证码发送成功');
        this.isOver = false;
      } catch(e) {
        this.preventCode = true;
        this.tips(e.response && e.response.data.msg);
      }
    },
    //定时器 发送验证码的定时器
    timeout () {
      var self = this;
      var second = 59, timer;
      timer = setInterval(function(){
        if(second<=0){
          clearInterval(timer);
          second = 59;
          self.codeText = "重发验证码";
          self.preventCode = true;
        }else{
          self.codeText = second + "s后可重发";
          self.preventCode = false;
          second--;
        }
      }, 1000);
    },
    //校验 手机号 密码 验证码
    checkValid() {
      var phone = this.phone;
      var token = this.token;
      if (!phone.trim()) {
        this.tips('请输入手机号')
        return false;
      } else if(!/^1\d{10}$/.test(phone)){
        this.tips('请输入正确的手机号')
        return false;
      }
      if (!token.trim()) {
        this.tips('请输入验证码')
        return false;
      }else if(token.length !== 6){
        this.tips('校验码为6位数')
        return false;
      }
      return true;
    },
    // 登录
    async goLogin() {
      if (!this.checkValid()) {
        return;
      }
      try {
        let interfaces = this.API.interfaces;
        let query = this.$root.$mp.query;
        let loginRes = {};
        loginRes = await interfaces.login(this.phone, this.token);
        console.log('loginRes', loginRes)
        if(loginRes.code == 0) {
          interfaces.syncStore(loginRes);
          this.loginSuccessHandle();
        } else if(loginRes.code == 10013) {
          this.tips('您的账号存在异常，请先联系4000-315-426解除异常');
          return;
        } else if(loginRes.code == 10023) {
          this.tips('手机验证码错误');
          return;
        } else if(loginRes.code == 10009) {
          this.tips('验证码发送过于频繁');
          return;
        } else if(loginRes.code == 10010 || loginRes.code == 10012 || loginRes.code == 500 || loginRes.code == 400 || loginRes.code == 100004 || loginRes.code == 100003 || loginRes.code == 10002) {
          this.init = false;
          this.isErr = true;
          this.tips(loginRes.msg || '系统升级中');
          return;
        } else if(loginRes.code == 300017){
          wx.showModal({
            title: '',
            showCancel:false,
            confirmColor:"#10AEFF",
            content: '手机号已与另一个微信账号关联，请换一个手机号再试'
          })
        } else if(loginRes.code == 300016){
          wx.showModal({
            title: '',
            showCancel:false,
            confirmColor:"#10AEFF",
            content: '微信账号已与另一个手机号关联，请换一个微信账号再试'
          })
        }else{
          console.log('sss')
          this.init = false;
          this.isErr = true;
          this.tips(loginRes.msg || '系统升级中');
        }
        console.log('loginRes:',loginRes)
      }
      catch(err){
        console.log('login error')
        // this.loaded();
      }
    },
    loginSuccessHandle(){
      let query = Object.assign({}, this.$root.$mp.query);
      let from = query.path;
      let userData = this.$storage.get('auth');
      let path = '';
      if (from) {
        path = from
        this.$router.push(path)
      } else{
        path = '/pages/my/my'
        wx.switchTab({
          url: path
        })
      }

    },
    // 获取加密的用户信息
    async getUserInfo(e) {
      let self = this;
      let userInfo = e.target.userInfo;
      console.log(e)
      if (userInfo) {
        await self.API.interfaces.getUserInfoByUser(e.target);
        // 因授权后可实现跨小程序免登录，这儿简单处理, 再次发起登录验证
        await self.checkLoginAndMark();
        self.show = false;
        wx.setNavigationBarTitle({
          title: '登录'
        });
      }else{
        // 拒绝授权的情况
        wx.showModal({
          title: '提示',
          content: '拒绝授权,小程序将不可用',
          success:function(res){
            self.backIndexFn();
          }
        })
      }
    },
  },
  watch: {
    phone (newPhone, oldPhone) {
      this.isOver = newPhone.length > 0 ? true : false;
      console.log(newPhone)
    }
  }
}
</script>

<style lang="scss">
  .login_page {
    position: absolute; width: 100%; height: 100%; background: #fff;
    .authorize_wrap {
      .logo_box {
        margin-top: 160px; width: 100%;
        img {width: 190px; height: 190px; border-radius: 100%;}
        .name {font-size: 36px; color: #333; font-weight: 500; line-height: 50px; margin-top: 30px;}
        .info {color: #999; font-size: 26px; line-height: 37px; margin-top: 12px;}
      }
      .btn_auth {width: 600px; height: 90px; line-height: 90px; padding: 0; border-radius: 45px; background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%); color: #fff; font-size: 32px; text-align: center; margin: 60px auto 0 ;display: block; }
    }
    .login_wrap {
      .logo_box {
        margin-top: 100px; width: 100%;
        img {width: 130px; height: 130px; border-radius: 16px;}
        .name {font-size: 36px; color: #333; font-weight: 600; line-height: 50px; margin-top: 24px;}
      }
      .login_form {margin-top: 90px;
        >h2{font-size: 42px;color: #333;line-height: 59px;font-weight: 600;margin-bottom: 21px;}
        padding: 0 60px;
        .line {
          width: 100%; border-bottom: 1px solid #E0E5EC; padding: 84px 0 12px;position: relative;
          .input {height: 56px; line-height: 56px; font-size: 40px;min-height: 56px;
            &.numInput{width: 420px;}
          }
          .input-placeholder{color: #999;font-size: 28px;line-height: 56px;}
          .link {color: #999; font-size: 28px; height: 56px;line-height: 56px;padding: 0; border: 0;min-width: 142px;}
          .disabled {color: #999}
          .isOver{color: #F64744;}
          >b{position: absolute;display: inline-block;line-height: 56px;height: 56px;color: #999;font-size: 28px;transition: all .3s ease;top: 84px;}
          .top{top: 21px;}
        }
        .submit_btn {width: 100%; height:90px; line-height: 90px; padding: 0; border-radius: 45px; background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%); color: #fff; font-size: 36px; text-align: center; margin-top: 60px;border: none;}
        .btnDisabled{opacity: 0.45;}
        .tips {
          width: 100%; font-size: 26px; margin-top: 40px; line-height: 37px;color: #888;
          .link {color: #F64744;}
        }
      }
      .tips_line {width: 522px; font-size: 20px; color: #999; line-height: 28px; margin: 210px auto 0 auto; text-align: center;}
    }
  }
</style>
