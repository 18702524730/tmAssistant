<template>
  <!-- 我的 -->
	<div class="my_page">
    <div class="column-start nologin" v-if="loginStatus==1">
      <div @click="jump('/pages/login/login?showAuthorize=true')">
        <img src="~assets/img/my/photo.png"/>
        <h3>您好，请先登录</h3>
        <p>登录后可查看用户订单信息</p>
      </div>
    </div>
    <div class="islogin" v-if="loginStatus==2">
      <div class="column-start top">
        <div class="photo_wrap">
          <img :src="auth.avatar">
        </div>
        <h3>{{auth.nickname}}</h3>
        <p>{{auth.phone}}</p>
      </div>
      <div class="box my_order">
        <div class="row-between title" @click="jump('/pages/my/orderList')">
          <span>我的订单</span><i class="icon iconfont icon-jiantou"></i>
        </div>
        <div class="row-around status">
          <div class="column-start s" @click="jumpOrderList(0)">
            <div class="status_img">
              <img src="~assets/img/my/01.png">
              <span v-if="result.orderStateCount1">{{result.orderStateCount1}}</span>
            </div>
            <span>待付款</span>
          </div>
          <div class="column-start s" @click="jumpOrderList(1)">
            <div class="status_img">
              <img src="~assets/img/my/03.png">
              <span v-if="result.orderStateCount3">{{result.orderStateCount3}}</span>
            </div>
            <span>未完成</span>
          </div>
          <div class="column-start s" @click="jumpOrderList(2)">
            <div class="status_img">
              <img src="~assets/img/my/02.png">
            </div>
            <span>已完成</span>
          </div>
          <div class="column-start s" @click="jumpOrderList(-1)">
            <div class="status_img">
              <img src="~assets/img/my/04.png">
            </div>
            <span>已关闭</span>
          </div>
        </div>
      </div>
      <div class="box my_gz">
        <div class="row-between title" @click="jump('/pages/my/gzList')">
          <span>我的公证</span><i class="icon iconfont icon-jiantou"></i>
        </div>
        <div class="row-around status">
          <div class="column-start s" @click="jumpGzList(1)">
            <div class="status_img">
              <img src="~assets/img/my/gz_01.png">
              <span v-if="result.serviceStateCount1">{{result.serviceStateCount1}}</span>
            </div>
            <span>待签约</span>
          </div>
          <div class="column-start s" @click="jumpGzList(2)">
            <div class="status_img">
              <img src="~assets/img/my/gz_02.png">
            </div>
            <span>正在受理</span>
          </div>
          <div class="column-start s" @click="jumpGzList(3)">
            <div class="status_img">
              <img src="~assets/img/my/gz_03.png">
              <span v-if="result.serviceStateCount3">{{result.serviceStateCount3}}</span>
            </div>
            <span>待补材料</span>
          </div>
          <div class="column-start s" @click="jumpGzList(4)">
            <div class="status_img">
              <img src="~assets/img/my/gz_04.png">
            </div>
            <span>公证完成</span>
          </div>
          <div class="column-start s" @click="jumpGzList(5)">
            <div class="status_img">
              <img src="~assets/img/my/gz_05.png">
            </div>
            <span>服务终止</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	export default {
		data() {
		  return {
        loginStatus: 0,
        auth: {},
        result: {}
		  }
    },
    components: {
    },
    mounted() {
    },
    onHide() {
    },
    async onShow(){
      try {
        let resp = await this.getResult();
        console.log('onShow:', resp)
        if (resp && resp.isLogin) {
          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#f64744',
            animation: {
              duration: 200,
              timingFunc: 'easeIn'
            }
          });
          if (!resp.noAgain) {
            this.getResult();
          }
          this.loginStatus = 2;
          this.auth = this.$storage.get('auth');
        }else{
          this.loginStatus = 1;
        }
      }
      catch (e){
        console.log('onShow e:', e)
        if (!e.isLogin) {
          this.loginStatus = 1;
        }
      }
		},
		methods: {
      jump(path) {
        this.$router.push(path)
      },
      jumpOrderList(orderState) {
        this.$router.push({
          path: '/pages/my/orderList',
          query: {
            orderState
          }
        })
      },
      jumpGzList(orderServiceState) {
        this.$router.push({
          path: '/pages/my/gzList',
          query: {
            orderServiceState
          }
        })
      },
      async getResult() {
        try {
          let resp = await this.API.my.getResult();
          console.log('getResult:',resp)
          resp.isLogin = true;
          resp.noAgain = true;
          this.result = resp;
          return resp;
        }
        catch(e){
          return e;
        }
      }
    },
    watch:{
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
	}
</script>
<style lang="scss">
	.my_page{
    height: 100%;min-height: 100%;background-color: #fff;
    .nologin{
      height: 100%;align-items: center;background: #fff url(~assets/img/my/bg.jpg) 0 bottom no-repeat;background-size: 750px 610px;
      >div{text-align: center;}
      img{width: 212px;height: 212px;margin-top: 114px;display: inline-block; border:6px solid #fff;border-radius: 212px;}
      h3{height:48px;font-size:34px;line-height:48px;color: #333;margin-top: 24px;}
      p{height:37px;font-size:26px;line-height:37px;color: #999;margin-top: 15px;}
    }
    .islogin{
      height: 100%;background: #fff url(~assets/img/my/hight_bg.png) 0 top no-repeat;background-size: 750px 137px;
      .top{
        align-items: center;
        .photo_wrap{
          width: 172px;height: 172px;margin-top: 25px;border:6px solid #fff;border-radius: 172px;overflow: hidden;
          img{width: 160px;height: 160px;}
        }
        h3{height:45px;font-size:32px;line-height:45px;color: #333;margin-top: 4px;}
        p{height:40px;font-size:28px;line-height:40px;color: #999;margin-top: 5px;}
      }
    }
    .box{
      height:246px;box-shadow:0px 2px 20px 0px rgba(91,2,0,0.08);border-radius:6px;margin: 30px 20px 0;background-color: #fff;
      padding-top: 30px;
      .title{
        height: 40px;line-height: 40px;margin-left: 30px;
        span{font-size:28px;height: 40px;line-height: 40px;color: #333;}
        i{width:40px;height: 40px;line-height: 40px;font-size: 20px;text-align: center;margin-right: 14px;color: #ddd;}
      }
      .status{
        padding-top: 33px;
        .s{
          align-items: center;
          .status_img{
            position: relative;height: 45px;width: 38px;padding-top: 7px;background-color: #fff;
            img{height: 38px;width: 38px;}
            span{position: absolute;top: 0;left:25px;display: inline-block; height: 30px;min-width: 30px;padding: 0 6px;line-height:28px;font-size:20px;border-radius:30px; border:1px solid rgba(246,71,68,1);color: #F64744;background-color: #fff; text-align: center;}
          }
          >span{height:33px;font-size:24px;line-height:33px;color: #666;margin-top: 25px;}
        }
      }
    }
    .my_order{}
    .my_gz{margin-top: 20px;}
	}
</style>
