<template>
  <div class="list_info">
    <div class="tab weui-flex" :class="{'boxShow':scrollY}">
      <div class="ml30 mr30 weui-flex__item" :class="{'bdc':orderState == 99}" @click="orderStateChange(99)">全部</div>
      <div class="weui-flex__item mr30" :class="{'bdc':orderState == 0}" @click="orderStateChange(0)">待付款</div>
      <div class="weui-flex__item mr30" :class="{'bdc':orderState == 1}" @click="orderStateChange(1)">未完成</div>
      <div class="weui-flex__item mr30" :class="{'bdc':orderState == 2}" @click="orderStateChange(2)">已完成</div>
      <div class="weui-flex__item mr30" :class="{'bdc':orderState == -1}" @click="orderStateChange(-1)">已关闭</div>
    </div>
    <template v-if="dataLists && dataLists.length">
    <!-- <div class="single_info">
      <div class="row-between info_title">
        <div>商标转让声明公证服务</div>
        <span class="hight">未付款</span>
      </div>
      <div class="info_tm"><span>转让商标：343434</span><span>淘宝 35</span></div>
      <div class="row-between total_wrap">
        <div class="total">总计:<p>￥<span>33.00</span></p></div>
        <div class="action">
          <span class="cancel">取消</span>
          <span class="pay">付款</span>
        </div>
      </div>
      <div class="row-between gz_status_wrap">
        <div class="gz_status">公证服务状态：<span>待签约</span></div>
        <div class="action">
          <span class="sign">签约</span>
        </div>
      </div>
    </div>
    <div class="single_info">
      <div class="row-between info_title">
        <div>商标转让声明公证服务</div>
        <span>未付款</span>
      </div>
      <div class="info_tm"><span>转让商标：343434</span><span>淘宝 35</span></div>
      <div class="row-between total_wrap">
        <div class="total">总计:<p>￥<span>33.00</span></p></div>
        <div class="action">
          <span class="cancel">取消</span>
          <span class="pay">付款</span>
        </div>
      </div>
      <div class="row-between gz_status_wrap">
        <div class="gz_status">公证服务状态：<span>待签约</span></div>
        <div class="action">
          <span class="sign">签约</span>
        </div>
      </div>
    </div> -->
    <scroll-view :scroll-y="true" v-if="dataLists && dataLists.length && loaded" upper-threshold @bindscrolltoupper="scrollT" @bindscroll="scrollT" @bindscrolltolower="addLists" :scroll-top="indexTop">
      <div class="single_info" v-for="(item,index) in dataLists" :key="index" @click="goDetail(item)">
        <div class="row-between info_title">
          <div>{{item.orderBsName}}</div>
          <span :class="{'hight': item.orderState == 0}">{{item.orderStateTxt}}</span>
        </div>
        <div class="info_tm"><span>转让商标：{{item.regNo}}</span><span>{{item.tmName}} {{item.cls}}</span></div>
        <div class="row-between total_wrap" :class="{'total_wrap1': item.orderState == 0}">
          <div class="total">总计:<p :class="{'hight': item.orderState == 0}">￥<span>{{item.orderAmount}}</span></p></div>
          <div class="action" v-if="item.orderState == 0">
            <span class="cancel" @click.stop="cancel(item)">取消</span>
            <span class="pay" @click.stop="selfPay(item)">付款</span>
          </div>
        </div>
        <div class="row-between gz_status_wrap" v-if="item.orderServiceStateTxt && item.orderState != 0">
          <div class="gz_status">公证服务状态：<span>{{item.orderServiceStateTxt}}</span></div>
          <div class="action" v-if="item.orderServiceState == 1">
            <span class="sign" @click.stop="toSigning(item)">签约</span>
          </div>
          <div class="action" v-if="item.orderServiceState == 4 && item.mailState == 0">
            <span class="sign" @click.stop="applyPost(item)">申请邮寄</span>
          </div>
        </div>
      </div>

      <div class="bottom_gif row-center" v-if="gifInfo">
        <text>加载中...</text>
      </div>

      <div class="footer mb30" v-if="nullInfo">到底啦~</div>
    </scroll-view>
    </template>

    <!-- 没订单 -->
    <div class="column-start null_single" v-if="dataLists && !dataLists.length && loaded">
      <img src="~assets/img/my/emptyImg.png">
      <div class="txt mt10">暂无订单信息</div>
    </div>
    <u-message/>
    <!-- 弹窗 -->
    <u-modal :showModal="showModal" :options="options" content="确认取消该订单吗？" @confirmBtn="confirmFn" @hide="hideFn" />
  </div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  import mixin from 'mixins/';
  import { _debounce } from 'utils/public';
  export default {
    mixins: [mixin],
    data(){
      return{
        nullInfo: false,
        gifInfo: false,
        pgIndex: 1,
        orderState: '',
        dataLists: [],
        pgCount: 10,
        scrollY: false,
        indexTop:0,
        scrollH:0,
        total:0,
        loaded:false,
        options: {
          confirmText: '确认',
          confirmColor: '#4272FF'
        },
        showModal:false,
        orderFictitiousSn:'',
        doubleClickState: false
      }
    },
    // 下拉刷新方法，与methods方法同级
    onPullDownRefresh() {
      // to doing..
      console.log('下拉刷新')
      this.search()
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    },

    // 上拉加载，拉到底部触发
    onReachBottom() {
      // 到底部在这里需要做什么事情
      let pageAll = this.total / this.pgCount;
      if(this.pgIndex >= pageAll) {
        this.loaded = true;
        this.nullInfo=true;
        this.gifInfo = false;
        return;
      }
      this.pgIndex += 1;
      this.nullInfo=false;
      this.gifInfo = true;
      this.search()
      console.log('上拉加载',this.pgIndex)
    },
    onShow(){
      let query = this.$root.$mp.query;
      console.log(this.$root)
      this.orderState = this.orderState ? this.orderState : query.orderState ? query.orderState - 0 : 99;
      console.log('orderState:',this.orderState)
      //this.search()
    },
    computed:{
      dataListInfo:{
        // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
        get () {
          return this.dataLists.forEach((item) => {
            item.createTime = Filters.filters.dateFormat(item.createTime);
            item.orderAmount = Filters.filters.priceformat(item.orderAmount);
          })
        },
        set (value) {
        }
      },
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
    methods: {
      // 支付
      selfPay: _debounce(async function (item) {
        let orderSn = item.orderSn;
        let paymentSn = item.orderPaymentSn;
        let resp = await this.API.order.selectOrderDetail(orderSn);
        item.orderServiceState = resp.orderServiceState;
        item.orderState = resp.orderState;
        item.orderStateTxt = Filters.filters.orderState(item.orderState);
        item.orderServiceStateTxt = Filters.filters.orderServiceState(item.orderServiceState);
        if (item.orderState == 0) {
          this.wechatPay(orderSn, paymentSn, (resp) => {
            this.pgIndex = 1;
            this.orderState = '';
            this.$router.push({ path: '/pages/order/submitMaterial', query: { orderSn } })
          }, (err) => {
            console.log(err)
          });
        } else {
          this.$message({content: '该订单状态已不能付款'})
        }
      }, 800, true),
      cancel(item) {
        this.showModal = true;
        this.orderFictitiousSn = item.orderSn;
      },
      // 签约
      toSigning: _debounce(async function (item) {
        let dqyState = item.dqyState;
        let orderSn = item.orderSn;
        let resp = await this.API.order.selectOrderDetail(orderSn);
        item.orderServiceState = resp.orderServiceState;
        item.orderState = resp.orderState;
        item.orderStateTxt = Filters.filters.orderState(item.orderState);
        item.orderServiceStateTxt = Filters.filters.orderServiceState(item.orderServiceState);
        if (item.orderServiceState == 1) {
          if (dqyState === 0) {
            this.$router.push({
              path: '/pages/order/submitMaterial',
              query: {
                orderSn
              }
            })
          } else {
            this.goH5(orderSn);
          }
        } else {
          this.$message({content: '该订单状态已不能签约'})
        }
      }, 800, true),
      // 申请邮寄
      applyPost: _debounce(async function (item) {
        let orderSn = item.orderSn;
        let resp = await this.API.order.selectOrderDetail(orderSn);
        item.orderServiceState = resp.orderServiceState;
        item.orderState = resp.orderState;
        item.mailState = resp.mailState;
        item.orderStateTxt = Filters.filters.orderState(item.orderState);
        item.orderServiceStateTxt = Filters.filters.orderServiceState(item.orderServiceState);
        if (item.orderServiceState == 4 && item.mailState == 0) {
          this.$router.push({
            path: '/pages/my/selectAddress',
            query: {
              orderSn
            }
          })
        } else {
          this.$message({content: '该订单状态已不能申请邮寄'})
        }
      }, 800, true),
      // 获取第三方h5页面跳转链接
      async goH5(orderSn) {
        let resp = await this.API.orderBs.startNotary(orderSn);
        if (resp.url) {
          this.$storage.set('signingUrl', resp.url);
          this.$router.push({
            path: '/pages/order/webView',
          })
        }
      },
      // 隐藏弹窗
      hideFn () {
        this.showModal = false;
      },
      // 弹窗回调
      async confirmFn (data) {
        if (data) {
          try {
            let resp = await this.API.order.cancleOrder(this.orderFictitiousSn);
            this.search()
          }
          catch (e) {
          }
        }
        else{
          console.log('取消回调')
        }
        this.showModal = false;
      },
      removeList(item){//删除关闭订单
        this.showModal = true;
        this.orderFictitiousSn = item.orderFictitiousSn
      },
      goDetail(item) {
        this.$router.push({path: '/pages/my/orderDetail?orderSn=' + item.orderSn});
      },
      scrollT(e){
        console.log(e.detail)
        if(e.detail.scrollTop > 10){
          this.scrollY = true;
        }else{
          this.scrollY = false;
        }
        this.$apply();
      },
      async search(){//初始化
        let self = this;
        let data = {
          orderState:this.orderState,
          pgIndex:this.pgIndex,
          pgCount:this.pgCount
        }
        try {
          let resp = await this.API.order.queryOrderList(data);
          this.loaded = true;
          this.total = resp.totalElements;
          resp.elements.forEach((item, index) => {
            item.orderStateTxt = Filters.filters.orderState(item.orderState);
            item.orderServiceStateTxt = Filters.filters.orderServiceState(item.orderServiceState);
          });
          self.gifInfo = false;
          if(this.pgIndex == 1){
            self.dataLists = resp.elements;
            return;
          }
          self.dataLists = [...self.dataLists, ...resp.elements]
          /*for(var i = 0; i < resp.elements.length; i++){
            self.dataLists.push(resp.elements[i]);
          }*/
        }
        catch (e) {
          if(self.pgIndex > 1){
            self.pgIndex -= 1;
          }
          this.gifInfo = false;
        }
      },
      orderStateChange(state) {//切换大类初始化
        this.orderState = state;
      },
    },
    watch: {
      orderState() {
        if(this.orderState || this.orderState === 0){
          this.pgIndex = 1;
          this.nullInfo=false;
          this.loaded = false;
          this.search();
          /*wx.pageScrollTo({
            scrollTop: 0
          })*/
        }
      },
    }
  }
</script>
<style lang="scss">
  // 列表部分样式
  .list_info{background-color:#f8f8f8;height:100%;position: relative;padding-top: 94px;
    // 头部切换
    .tab{height:94px;background-color:#fff;position: fixed;top:0;width:750px;z-index: 100;
      div.bdc{border-bottom:4px solid #F64744;color: #333;font-weight:600;}
      div{text-align: center;line-height:94px;box-sizing:border-box;color: #333;font-size: 28px;}
    }
    // 阴影
    .boxShow{box-shadow: 0 6px 12px 0 rgba(47,128,246,0.09), inset 0 0 0 0 #E0E5EC;box-sizing:border-box;}
    // 列表内容部分
    .single_info{
      margin: 20px 20px 0;background-color:#fff;border-radius: 6px;z-index:1;position:relative;padding:20px;
      .info_title{
        div{height:40px;line-height:40px;font-size:28px;color: #333;font-weight:600;}
        span{height:40px;line-height:40px;font-size:28px;color: #999;}
        .hight{color: #F64744;}
      }
      .info_tm{
        margin-top: 20px;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        span{height:40px;line-height:40px;font-size:28px;color: #666;margin-right: 10px;}
      }
      .total_wrap{
        height: 56px;margin-top: 20px;color: #666;
        .total{
          height:42px;font-size:24px;color: #666;
          p{
            display: inline-block;color: #666;font-size: 24px;
            span{font-size: 30px;color: #666;}
            &.hight{
              color: #F64744;
              span{color: #F64744;}
            }
          }
        }
        .action{
          span{display: inline-block;width:145px;height:56px;border-radius:29px;text-align: center;}
          .cancel{border:1px solid #ddd;font-size:26px;line-height: 54px;color: #333;}
          .pay{margin-left: 10px;background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%);font-size:26px;line-height: 56px;color: #fff;}
        }
      }
      .total_wrap1{margin-top: 30px;}
      .gz_status_wrap{
        height: 76px;border-top:1px solid #eee;margin-top: 19px;padding-top: 19px;
        .gz_status{
          height:37px;font-size:26px;
          span{
            color: #F5A623;font-size: 26px;
          }
        }
        .action{
          span{display: inline-block;width:145px;height:56px;border-radius:29px;text-align: center;font-size:26px;}
          .sign{margin-left: 10px;background:linear-gradient(297deg,rgba(255,183,118,1) 0%,rgba(255,162,0,1) 100%);line-height: 56px;color: #fff;}
        }
      }
    }

    .footer{text-align: center;padding-top: 20px;color: #999;}

    .null_single{
      height: 100%;align-items: center;
      img{width: 422px; height: 384px;margin-top: 177px;}
      .txt{height:40px;line-height: 40px;font-size:28px;color: #999;}
    }
  }
</style>
