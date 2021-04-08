<template>
  <div class="authorize" v-if="show">
    <img src="~assets/img/icon/logo.jpg">
    <h3>请先登录！</h3>
    <p>为了更好的体验，请先完成以下授权！</p>
    <button type="primary" :class="['sebe-btn', 'sebe-btn-warn', isIpt ? 'ipt' : '']" open-type="getUserInfo" @getuserinfo="getUserInfo">小程序授权</button>
    <!-- <official-account></official-account> -->
  </div>
</template>
<script>
  import mixin from 'mixins/';
  export default{
    components:{
    },
    mixins: [mixin],
    data(){
      return{
        show: false,
        isIpt: false,
        appType: 'b' // b或c端
      }
    },
    mounted(){
      // this.forceUpdateManager();
      this.init();
      setTimeout(() => {
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff'
        })
      }, 300);
    },
    methods :{
      async init() {
        this.isIpt = false;
        this.show = false;
        let query = this.$root.$mp.query;
        if (query.iptType) {
          this.isIpt = true;
        }
        console.log('authorize_query:', query)
        // isAuth表示是否授权 true:已授权 false:已授权
        let isAuth = await this.checkLoginAndMark();
        console.log('isAuth', isAuth)
        // 因授权后可实现跨小程序免登录, 删除noHandle标志，后面需要再登录验证
        delete query.noHandle;
        console.log('query.noHandle:', query.noHandle)
        this.show = isAuth === false ? true : false;
        if (this.show) {
          wx.setNavigationBarTitle({title: '小程序授权'});
        }
        // 获取memberID，访问分享领珍珠接口，分享人获取创力\
        
        let memberId = this.getMemberId();
        let params = {type: 'b'};
        if (memberId) {
          memberId = parseInt(memberId);
          params.memberId = memberId;
          if (query.shareId) {
            params.shareId = query.shareId;
          }
          console.log('params', params)
          if (this.appType == 'c') {
            params.type = 'c';
            this.appType = 'b';
          }
          this.$storage.set("memberObj", params);
        }
      },
      getMemberId () {
        let memberId;
        let query = this.$root.$mp.query;
        if (query.scene) {
          query.scene = decodeURIComponent(query.scene);
          // 兼容生成二维码scene为memberId = 123
          if (query.scene.indexOf('memberId=') != -1) {
            query.scene = qs.parse(query.scene);
            memberId = query.scene.memberId;
          } else {
            // 兼容生成二维码scene = 123
            let queryArr = query.scene.split('_');
            memberId = queryArr[0];
            if (queryArr.length>1&&queryArr[1]=='c') {
              this.appType = 'c'
            }
          }
        } else {
          // 分享给好友
          memberId = query.memberId;
        }
        return memberId;
      },
      goBindPhone() {
        let query = this.$root.$mp.query;
        let path;
        // 珍珠过来的不去介绍页直接去绑定手机号页面
        if (query.iptType) {
          path = '/pages/authorize/bindPhone'
        } else {
          path = '/pages/authorize/introduction'
        }
        console.log('path', path)
        this.$router.replace({
          path: path,
          query: this.$root.$mp.query
        })
      },
      async getUserInfo(e) {
        let userInfo = e.target.userInfo;
        console.log(e)
        if (userInfo) {
          await this.API.interfaces.getUserInfoByUser(e.target);
          // 因授权后可实现跨小程序免登录，这儿简单处理, 再次发起登录验证
          await this.checkLoginAndMark();
          this.goBindPhone();
        }else{
          // 拒绝授权的情况
          wx.showModal({
            title: '提示',
            content: '拒绝授权,小程序将不可用',
            success:function(res){
            }
          })
        }
      },
      // 支付成功的回调接口
      paymentSuccess (e) {
        console.log(e);
      },
      // 支付失败的回调接口
      paymentFailed (e) {
        console.log(e);
      },
      testImg(){
        console.log(this.imageUrl)
        wx.showShareMenu({
          withShareTicket: true
        })
      },
      handleClickTest () {
        console.log(1)
        wx.hideShareMenu()
        // wx.showShareMenu({
        //   // withShareTicket: true
        // })
      },
      setUpImage(data){
        this[data.valueName] = data.url;
        console.log(this.Image01,'测试图片url')
      }
    },
  }
</script>
<style lang="scss">
  .authorize{
    height: 100%;display: flex;flex-direction: column;align-items: center;background-color: #fff;
    img{width: 190px;height: 190px;margin-bottom: 30px;margin-top: 160px;border:1px solid #eee;border-radius: 95px;}
    h3{font-size: 36px;height: 50px;margin-bottom: 12px;font-weight: 500;}
    p{height: 37px;color: #999;margin-bottom: 60px;}
    button{width: 600px;font-size:32px;line-height: 1;padding: 30px 0;border-radius: 6px;background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%);}
    .ipt{background:linear-gradient(90deg,rgba(114,225,161,1) 0%,rgba(91,223,203,1) 100%);}
  }
</style>
