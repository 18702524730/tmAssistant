<template>
  <div class="index_home">
    <!-- banner -->
    <swiper  class="banner"
      :autoplay="true" :interval="3500" :duration="500" :circular="true" @change="bannerChange" indicator-color="rgba(255,255,255, .2)" indicator-active-color="#fff" :skip-hidden-item-layout="true">
      <block>
        <swiper-item @click="toDetail(item)">
          <img src="../../assets/img/index/banner.jpg" mode="aspectFill"/>
        </swiper-item>
      </block>
    </swiper>
    <!-- 商品 -->
    <div class="trademarkWrap">
      <h2>商标交易公证-转让声明</h2>
      <p><span>￥</span><i>{{price}} </i><span>/次</span><span class="price">市场价：¥600.00~800.00</span></p>
      <div class="label">
        <span>便捷提交</span><span>急速出证</span>
      </div>
      <button type="button" @click="goSubmit" id="buyBtn" class="btn">立即办理</button>
    </div>
    <!-- 详情 -->
    <div class="detailWrap">
      <div class="detail1">
        <h2>足不出户 极速办理</h2>
        <img src="~assets/img/index/detail1.png" alt="">
        <h3>法律保障</h3>
        <p>拥有同线下公证同等的法律效力</p>
        <h3>方便便捷</h3>
        <p>线上操作，在线认证、支付、公证</p>
        <h3>节省成本</h3>
        <p>有效省去线下人工成本和时间成本</p>
      </div>
      <div class="detail2">
        <h2>简单四步 便捷公证</h2>
        <img src="~assets/img/index/detail2.png" alt="">
        <h3>1.实名认证</h3>
        <p>个人完成实名认证，机构需法人完成实名认证</p>
        <h3>2.订单支付</h3>
        <p>提交公证订单，在线使用支付宝 /微信支付完成支付</p>
        <h3>3.转让信息提交</h3>
        <p>提交转让人、受让人及商标等基本信息</p>
        <h3>4.在线公证申办</h3>
        <p>进入公证环境，在线完成认证，获得公证书</p>
      </div>
      <div class="detail3">
        <h2>可同时获得电子和纸质公证书</h2>
        <img src="~assets/img/index/detail3.png" alt="">
        <p>支付快递费用可获得纸质版公证书一份，含正副本各一份。如增加副本数每份另收费20元。</p>
      </div>
      <div class="parter">
        <h2>战略合作伙伴</h2>
        <div class="imgWrap">
          <img src="~assets/img/index/logo1.jpg" alt="">
          <img src="~assets/img/index/logo2.jpg" alt="">
          <img src="~assets/img/index/logo3.jpg" alt="">
        </div>
        <p>本公证服务由公证云提供公证信息化支撑 鹭江公证处提供公证服务</p>
      </div>
    </div>
    <!-- 在线咨询 -->
    <div @click="wechatStatus = !wechatStatus" :class="['wechat', wechatStatus ? 'wechatShow' : '']">
      <img src="~assets/img/icon/talk.png" alt="">
      <p>在线客服</p>
      <button :class="['wechat', wechatStatus ? 'btnShow' : '']" open-type="contact" ></button>
    </div>
    <!-- <button class="wechat" @click="wechatStatus = !wechatStatus" :class="['wechat', wechatStatus ? 'wechatShow' : '']" :open-type="weixinStatus ? 'contact' : ''">
      在线客服
    </button> -->
    <!-- 立即办理悬浮按钮 -->
    <div class="buyNow" @click="goSubmit" v-if="btnFixed">立即<br>办理</div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      btnTop: 418,
      price: '360.00',
      btnFixed: false,
      wechatStatus: false
    }
  },
  mounted() {
  },
  onLoad () {
    this.init()
  },
  async onShow () {
  },
  // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    obj = {
      title: '知证通',
      path: "/pages/index/index",
    }
    return obj;
  },
  onPageScroll (e){
    this.btnFixed = e.scrollTop > this.btnTop ? true : false

    this.wechatStatus = false;

  },
  methods: {
    goSubmit () {
      this.$storage.remove('cateIdData');
      this.$storage.remove('signingUrl');
      this.$router.push(`/pages/order/submitOrder?price=${this.price}`);
    },
    async selectOrderAmount () {
      let data = await this.API.order.selectOrderAmount();
      this.price = Number(data).toFixed(2);
    },
    init () {
      // 获取按钮到文档顶部的距离
      var query = wx.createSelectorQuery()
      query.select('#buyBtn').boundingClientRect()
      query.exec( (res)  => {
        console.log('res', res)
        this.btnTop = res[0].top + res[0].height
      });
      this.selectOrderAmount();
    }
  }
}
</script>

<style lang="scss">
.index_home{
  .banner{height: 520px;
    swiper-item{
      img{width: 100%;height: 520px;}
    }
  }
  .trademarkWrap{padding: 30px;border-radius: 20px 20px 0 0;background: #fff;transform: translateY(-20px);
    h2{font-size: 32px;line-height: 45px;color: #333;font-weight: 600;}
    >p{color: #F64744;margin: 15px 0;position: relative;
      span{font-size: 24px;}
      i{font-size: 48px;color: #F64744;line-height: 67px;}
      .price{line-height: 42px;padding: 0 15px 0 22px;position: absolute;top: 16px;left: 223px;background: url('../../assets/img/icon/icon1.png') no-repeat 0 0;background-size: 316px 42px;color: #FF9639;}
    }
    .label{
      span{line-height: 44px;border: 1px solid #36af47;padding: 0 15px;display: inline-block;border-radius: 25px;margin-right: 10px;
      color: #36af47;font-size: 22px;font-size: 22px;}
    }
    .btn{width: 100%;line-height: 90px;padding: 0;border-radius: 45px;background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%);
    border: none;color: #fff;font-size: 30px;margin-top: 30px;}
  }
  .detailWrap{
    .detail1,.detail2, .detail3{padding: 80px 0 25px;background: #fff;
      h2{font-size: 36px;color: #333;font-weight: 600;line-height: 47px;text-align: center;padding: 0 60px;}
      h3{line-height: 45px;font-size: 32px;color: #333;font-weight: 600;padding: 0 60px;}
      p{font-size: 28px;line-height: 40px;color: #666;padding: 15px 60px 35px;}
    }
    .detail1 img{
      width: 750px;height: 670px;margin-top: 33px;
    }
    .detail2{background:rgba(249,251,255,1);
      h3{font-size: 30px;line-height: 42px;}
      p{font-size: 26px;line-height: 37px;}
      img{width: 750px;height: 500px;margin: 45px 0 47px;}
    }
    .detail3{
      p{text-align: center;font-size: 24px;line-height: 33px;color: #999;}
      img{width: 750px;height: 498px;margin: 29px 0 20px;}
    }
    .parter{padding: 60px 15px 80px;background:rgba(249,251,255,1);
      h2{font-size: 32px;line-height: 45px;font-weight: 600;text-align: center;}
      p{font-size: 22px;text-align: center;line-height: 30px;padding: 0 162px;color: #999;}
      >div{font-size: 0;
        img{width: 210px;height: 80px;margin: 60px 15px 40px;}
      }
    }
  }
  .wechat{line-height: 70px;border-radius: 35px;font-size: 24px;color: #333;position: fixed;top: 20px;padding: 0 20px 0 20px;width: 178px;display: flex; box-shadow:0px 10px 20px 0px rgba(0,0,0,0.08);right: -68px;z-index: 100;transition: all .3s ease;border: none;align-items: center;
    background: #fff ;background-size: 36px 36px;
    img{width: 42px;height: 36px;padding-right:6px;}
    button{position: absolute;top: 0;left: 0;z-index: -1;box-shadow: none;background: none;width: 178px;height: 70px;
      &.btnShow{z-index: 111;}
    }
  }
  .wechatShow{right: 20px;}
  .buyNow{position: fixed;width: 140px;height: 140px;padding: 33px 0;font-size: 26px;line-height: 37px;color: #fff;
  background:linear-gradient(180deg,rgba(246,71,68,1) 0%,rgba(246,123,68,1) 100%);box-shadow:0px 2px 20px 0px rgba(246,71,68,0.43);bottom: 40px;
  right: 30px;border-radius: 70px;text-align: center;}
}
</style>
