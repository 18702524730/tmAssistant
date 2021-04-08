<template>
  <div class="gz_list_info">
    <scroll-view :scroll-x="true" :upper-threshold="30" :lower-threshold="30" :scroll-into-view="tabId" @scrolltoupper="scrollToUpper" @scroll="isToBefore=false,isToAfter=false,tabId=''" @scrolltolower="scrollToLower" class="tab" :class="{'boxShow':scrollY}">
      <div class="before" v-if="isToBefore" @click="orderStateChange(99)"></div>
      <div class="weui-flex tabin" id="all">
        <div :class="{'bdc':orderServiceState == 99}" @click="orderStateChange(99)">全部</div>
        <div :class="{'bdc':orderServiceState == 1}" @click="orderStateChange(1)">待签约</div>
        <div :class="{'bdc':orderServiceState == 2}" @click="orderStateChange(2)">受理中</div>
        <div :class="{'bdc':orderServiceState == 3}" @click="orderStateChange(3)">待补材料</div>
        <div :class="{'bdc':orderServiceState == 4}" @click="orderStateChange(4)">公证完成</div>
        <div :class="{'bdc':orderServiceState == 5}" @click="orderStateChange(5)" id="over">服务终止</div>
      </div>
      <div class="after" v-if="isToAfter" @click="orderStateChange(5)"></div>
    </scroll-view>
    <!-- <div class="single_info">
      <div class="info_title">公证状态：<span class="complete">未付款</span></div>
      <div class="info_tm">
        <div class="row name"><label>转让商标</label><span>343434 淘宝 35</span></div>
        <div class="row bdy mt20"><label>转让主体</label><span>战三</span></div>
        <img src="~assets/img/my/to.png">
        <div class="row bdy mt10"><label>受让主体</label><span>战唔</span></div>
      </div>
      <div class="gz_status">
        <span class="sign">签约</span>
      </div>
    </div>
    <div class="single_info">
      <div class="info_title">公证状态：<span>未付款</span></div>
      <div class="info_tm">
        <div class="name"><label>转让商标</label><span>343434 淘宝 35</span></div>
        <div class="bdy mt20"><label>转让主体</label><span>战三</span></div>
        <img src="~assets/img/my/to.png">
        <div class="bdy mt10"><label>受让主体</label><span>战唔</span></div>
      </div>
      <div class="gz_status">
        <span class="sign">签约</span>
      </div>
    </div> -->
    <template v-if="dataLists && dataLists.length">
     <scroll-view :scroll-y="true" v-if="dataLists && dataLists.length && loaded" upper-threshold @bindscrolltoupper="scrollT" @bindscroll="scrollT" @bindscrolltolower="addLists" :scroll-top="indexTop">
      <div v-for="(item,index) in dataLists" :key="index" @click="goDetail(item)">
        <div class="single_info" :class="{'mt20' : index == 0}" style="box-sizing:border-box;">
          <div class="info_title">公证状态：<span :class="{'complete': item.orderServiceState == 4}">{{item.orderServiceStateTxt}}</span></div>
          <div class="info_tm">
            <div class="row name"><label>转让商标</label><span>{{item.regNo}} {{item.tmName}} {{item.cls}}</span></div>
            <div class="row bdy mt20"><label>转让主体</label><span>{{item.subjectName}}</span></div>
            <img src="~assets/img/my/to.png">
            <div class="row bdy mt10"><label>受让主体</label><span>{{item.assigneeName}}</span></div>
          </div>
          <div class="gz_status" v-if="item.orderServiceState == 1">
            <span class="sign" @click.stop="toSigning(item)">签约</span>
          </div>
          <div class="gz_status" v-if="item.orderServiceState == 3">
            <span class="sign">补充材料</span>
          </div>
          <div class="gz_status" v-if="item.orderServiceState == 4 && item.mailState == 0">
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
  import { _debounce } from 'utils/public';
  export default {
    data(){
      return{
        nullInfo: false,
        gifInfo: false,
        pgIndex: 1,
        orderServiceState: '',
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
        doubleClickState: false,
        isToBefore: false,
        isToAfter: true,
        tabId: 'all',
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
        this.loading = true;
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
    // 监听用户点击页面内转发按钮
    onShareAppMessage() {
      let obj = {};
      obj = {
        title: '知证通',
        path: "/pages/index/index",
      }
      return obj;
    },
    mounted(){
      let query = this.$root.$mp.query;
      this.orderServiceState = query.orderServiceState ? query.orderServiceState - 0 : 99;
      if (!query.orderServiceState) {
        this.search();
      }
      console.log('this.orderServiceState:', this.orderServiceState);
    },
    onUnload() {
      this.orderServiceState = '';
    },
    methods: {
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
      scrollToUpper() {
        setTimeout(() => {
          this.isToAfter = true;
        }, 100);
      },
      scrollToLower() {
        setTimeout(() => {
          this.isToBefore = true;
        }, 100);
      },
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
            let resp = await this.API.order.deleteOrder({orderFictitiousSn:this.orderFictitiousSn});
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
        console.log(10)
        let self = this;
        let data = {
          orderServiceState:this.orderServiceState,
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
        }
        catch (e) {
          if(self.pgIndex > 1){
            self.pgIndex -= 1;
          }
          this.gifInfo = false;
        }
      },
      orderStateChange(state) {//切换大类初始化
        this.orderServiceState = state;
      },

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
    watch: {
      orderServiceState(state) {
        if(state || state === 99){
          if (state == 99) {
            this.tabId = 'all';
          } else if (state == 5) {
            this.tabId = 'over';
          } else {
            this.tabId = '';
          }
          this.pgIndex = 1;
          this.nullInfo=false;
          this.loaded = false;
          this.search();
          wx.pageScrollTo({
            scrollTop: 0
          });
        }
      },
    }
  }
</script>
<style lang="scss">
  // 列表部分样式
  .gz_list_info{background-color:#f8f8f8;height:100%;position: relative;padding-top: 94px;
    // 头部切换
    .tab{height:94px;background-color:#fff;position: fixed;width:100%;top:0;z-index: 100;
      .before{position: fixed;top:0;left:0;width:71px;height:89px;background:linear-gradient(-90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);}
      .after{position: fixed;top:0;right:0;width:71px;height:89px;background:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);}
      .tabin{
        width:810px;padding-left: 10px;justify-content: space-around;flex-direction: row;align-items: center;
        div.bdc{height: 94px;border-bottom:4px solid #F64744;line-height:92px;font-weight:600;}
        div{height: 94px;text-align: center;line-height:94px;box-sizing:border-box;color: #333;font-size: 28px;}
      }
    }
    /*隐藏滚动条*/
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      color: transparent;
    }
    // 阴影
    .boxShow{box-shadow: 0 6px 12px 0 rgba(47,128,246,0.09), inset 0 0 0 0 #E0E5EC;box-sizing:border-box;}
    // 列表内容部分
    .single_info{
      margin: 20px 20px 0;background-color:#fff;border-radius: 6px;z-index:1;position:relative;padding:20px;
      .info_title{
        height:40px;line-height:40px;font-size:28px;color: #333;font-weight:600;
        span{height:40px;line-height:40px;font-size:28px;color: #F5A623;}
        .complete{color: #36AF47;}
      }
      .info_tm{
        margin-top: 20px;padding: 20px;background-color: #F8F8F8;
        >div{
          height:37px;line-height: 37px;font-size:26px;
          label{display: inline-block;color: #999;line-height: 37px;}
          span{display: inline-block;color: #333;line-height: 37px;margin-left: 20px;width: 500px;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
        }
        img{display:block;width: 20px;height: 40px;margin-top: 10px;margin-left: 42px;}
      }
      .gz_status{
        height: 56px;margin-top: 20px;text-align: right;
        span{display: inline-block;width:145px;height:56px;border-radius:29px;text-align: center;font-size:26px;}
        .sign{margin-left: 10px;background:linear-gradient(297deg,rgba(255,183,118,1) 0%,rgba(255,162,0,1) 100%);line-height: 56px;color: #fff;}
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
