<template>
  <div class="order_pay_info" :class="[isIphoneX ? 'phoneXWrap' : '']">
    <div class="column-start info_order">
      <img src="~assets/img/order/wechat.png">
      <p class="tit mt30">商标交易公证-转让声明</p>
      <p class="order_num mt15"><span>订单号：</span><span>{{orderData.orderSn}}</span></p>
      <p class="order_total mt30">￥<span>{{orderAmount}}</span></p>
    </div>

    <div class="tm_info">
      <h4>转让主体</h4>
      <p class="list mt20"><span>姓名</span><span>{{orderData.subjectName}}</span></p>
      <p class="list mt20"><span>身份证号</span><span>{{orderData.subjectIdno}}</span></p>
      <!-- <p class="list mt20"><span>公司名称</span><span>淘宝</span></p>
      <p class="list mt20"><span>统一社会信用代码</span><span>10289107903</span></p> -->
    </div>

    <div class="tm_info">
      <h4>商标信息</h4>
      <p class="list mt20"><span>商标名称</span><span>{{orderData.tmName}}</span></p>
      <p class="list mt20"><span>注册号</span><span>{{orderData.regNo}}</span></p>
      <p class="list mt20"><span>商标类别</span><span>{{orderData.cls}}</span></p>
    </div>

    <!-- 付款按钮 -->
    <div class="btn_footer">
      <span class="pay" @click="selfPay">立即支付</span>
      <div class="iphoneX" v-if="isIphoneX"></div>
    </div>
    <u-message/>
  </div>
</template>

<script>
  import Filters from '../../utils/filters.js';
  import mixin from 'mixins/';
  //import md5 from 'js-md5';
  export default {
  mixins: [mixin],
  data(){
    return{
      doubleClickState: false,
      orderData: {},
      isIphoneX: false,
    }
  },
  mounted(){
    this.isIphoneX = this.judgeIsPhoneX();
    let query = this.$root.$mp.query;
    //query = {"orderBsName":"商标交易公证-转让声明","orderSn":"GZ190225002058","orderAmount":1200,"orderServiceState":1,"subjectName":"ss","subjectIdno":"330122198312053236","regNo":"11111111","tmName":"陵者 PHILLGUY","cls":"24","subjectType":1,"orderPaymentSn":"15510611319794691"};
    this.orderData = query;
    console.log(query)
  },
  methods: {
    // 关闭支付弹框
    closePayDia () {
      this.payVisible = false;
    },
    // 支付
    async selfPay (type) {
      if (this.doubleClickState) {
        return;
      }
      this.doubleClickState = true;
      let orderSn = this.orderData.orderSn;
      let paymentSn = this.orderData.orderPaymentSn;
      this.wechatPay(orderSn, paymentSn, (resp) => {
        this.doubleClickState = false;
        // wx.switchTab({
        //   url: '/pages/my/my'
        // })
        this.$router.replace({ path: '/pages/order/submitMaterial', query: { orderSn } });
        //小程序上支付完成后wx.reLaunch不会跳转
        //wx.reLaunch({url: `/pages/order/submitMaterial?orderSn=${orderSn}`});
      }, (err) => {
        this.doubleClickState = false;
        console.log(err)
        // this.search();
        // wx.reLaunch({url: `/pages/order/orderDetails?orderFictitiousSn=${orderSn}&paymentSn=${paymentSn}`});
      });
    },
    toHome(){
      wx.switchTab({ url: '../index/my'})
    },
    callPhone(phone){
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },
  },
  computed:{
    orderAmount () {
      return Filters.filters.priceformat(this.orderData.orderAmount)
    },
  },
}
</script>

<style lang="scss">
  .order_pay_info{
    min-height:100%;padding-bottom: 98px;padding-top: 20px;
    &.phoneXWrap{padding-bottom: 166px;}
    .info_order{
      position: relative;margin:0 20px 0;padding:60px 0 50px;background-color: #fff;border-radius:6px;align-items: center;
      >img{width: 240px; height: 54px;}
      .tit{height:42px;line-height: 42px;font-size:30px;font-weight: 600;}
      .order_num{height:37px;line-height: 37px;font-size:26px;}
      .order_total{
        font-size: 28px;color: #F64744;font-weight: 600;
        span{font-size: 46px;line-height: 65px;height: 65px;}
      }
    }
    .tm_info{
      margin:20px 20px 0;background-color: #fff;border-radius:6px;padding: 20px;
      h4{height:63px;padding-bottom: 20px;line-height:42px;font-size:30px;border-bottom: 1px solid #eee;}
      .list{
        margin-top: 20px;display: flex;flex-direction: row;align-items: flex-start;justify-content: space-between;
        span{
          line-height:40px;font-size:28px;color: #333;display: inline-block;max-width:440px;word-break:break-all;
          &:first-child{color: #999999;}
          //.img{
            //width: 200px; height: 200px;
            img{width: 200px; height: 200px;}
          //}
        }
      }
    }

    .btn_footer{
      width:100%;height:98px;position: fixed;bottom:0;left:0;box-shadow:0px -2px 20px 0px rgba(147,2,0,0.08);
      span.pay{background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%);display: inline-block;width:100%;height:98px;text-align: center;font-size:32px;line-height: 98px;color: #fff;}
      .iphoneX{height: 68px;background: #fff;}
    }
  }
</style>
