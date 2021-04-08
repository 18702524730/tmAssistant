<template>
  <div class="detail_info" v-if="dataDetails.tmName" :class="{'bgc01':dataDetails.orderState == 0, 'phoneXWrap': dataDetails.orderState == 0 && isIphoneX}">
    <div class="detail_top">
      <div class="info_good">
        <div class="row-between info_title">
          <div>{{dataDetails.orderBsName}}</div>
          <span :class="{'hight': dataDetails.orderState == 0}">{{dataDetails.orderStateTxt}}</span>
        </div>
        <div class="info_tm_wrap mt20">
          <div class="info_tm info_tm_other" v-if="!allMsg"><span>转让商标</span><span class="other">{{dataDetails.regNo}} {{dataDetails.tmName}} {{dataDetails.cls}}</span></div>
          <div class="info_tm" v-else>
            <p><span>注册号</span><span>{{dataDetails.regNo}}</span></p>
            <p><span>商标名称</span><span>{{dataDetails.tmName}}</span></p>
            <p><span>商标类别</span><span>{{dataDetails.cls}}</span></p>
            <template v-if="dataDetails.subjectType == 1">
              <p><span>转让主体</span><span>{{dataDetails.subjectName}}</span></p>
              <p><span>身份证号</span><span>{{dataDetails.subjectIdno}}</span></p>
            </template>
            <template v-if="dataDetails.subjectType == 2">
              <p><span>转让主体</span><span>{{dataDetails.subjectName}}</span></p>
              <p><span>社会统一信用代码</span><span>{{dataDetails.subjectIdno}}</span></p>
            </template>
          </div>
          <p class="tip">*此信息为订单提交过程中填写，公证处以签约信息为准</p>
          <template v-if="dataDetails.orderState !== 0">
            <i v-if="allMsg" class="icon iconfont icon-jiantou info_more down" @click="allMsg = false"></i>
            <i v-else class="icon iconfont icon-jiantou info_more up" @click="allMsg = true"></i>
          </template>
        </div>
        <!-- 退款节点：订单未完成（已付款）+ 受理中和补充材料、公证完成不能退 -->
        <div class="row-between total"><p>总计：<span :class="{'hight': dataDetails.orderState == 0}"><i>￥</i>{{orderAmount}}</span></p><span class="refund" v-if="dataDetails.orderState == 1 && !(dataDetails.orderServiceState == 2 || dataDetails.orderServiceState == 3 || dataDetails.orderServiceState == 4)" @click="showPop(2)">退款</span></div>
        <div class="order_info">
          <p class="order_list mt20"><span>订单号：</span><span>{{dataDetails.orderSn}}</span></p>
          <p class="order_list mt20"><span>下单时间：</span><span>{{createTime}}</span><span v-if="!createTime" style="color:#999;">（空）</span></p>
          <p class="order_list mt20" v-if="dataDetails.orderState > 0"><span>支付状态：</span><span>已付款</span></p>
          <p class="order_list mt20" v-if="dataDetails.orderState > 0"><span>支付方式：</span><span>{{dataDetails.paymentName}}</span></p>
          <p class="order_list mt20" v-if="dataDetails.orderState > 0"><span>支付时间：</span><span>{{paymentTime}}</span><span v-if="!createTime" style="color:#999;">（空）</span></p>
        </div>
      </div>

      <div class="gz_info post_info mt20" v-if="dataDetails.mailState>0 && dataDetails.mailInfoVo">
        <h3>邮寄信息</h3>
        <div class="tm_info">
          <h4>收件信息</h4>
          <p class="list mt20"><span>收件人</span><span>{{dataDetails.mailInfoVo.addresseeName}}</span></p>
          <p class="list mt20"><span>联系电话</span><span>{{dataDetails.mailInfoVo.addresseePhone}}</span></p>
          <p class="list mt20"><span>收件地址</span><span class="cls">{{dataDetails.mailInfoVo.addresseeCity}}{{dataDetails.mailInfoVo.addresseeAdd}}</span></p>
        </div>
        <div class="tm_info" v-if="dataDetails.mailState==2">
          <h4>寄件信息</h4>
          <p class="list mt20"><span>寄件人</span><span>{{dataDetails.mailInfoVo.postMan}}</span></p>
          <p class="list mt20"><span>寄件时间</span><span>{{dataDetails.mailInfoVo.sendTime}}</span></p>
          <p class="list mt20"><span>快递公司</span><span class="cls">{{dataDetails.mailInfoVo.express}}</span></p>
          <p class="list mt20"><span>快递单号</span><span>{{dataDetails.mailInfoVo.expressNo}}<i @click="copyNo(dataDetails.mailInfoVo.expressNo)">复制</i></span></p>
        </div>
      </div>

      <div class="gz_info mt20" v-if="dataDetails.orderState !== 0">
        <div class="gz_top">
          <div class="info_title">公证状态：<span class="complete">{{dataDetails.orderServiceStateTxt}}</span></div>
          <p class="time" v-if="dataDetails.expiryTime">签约时间：{{expiryTime}}</p>
          <template v-if="dataDetails.orderServiceState==3">
            <span class="fill" v-if="!showOther" @click="toFill">补充材料</span>
            <span class="fill" v-else @click="toFillSubmit">提交</span>
          </template>
          <span class="sign" v-if="dataDetails.orderServiceState==1" @click.stop="toSigning">签约</span>
          <span class="sign" v-if="dataDetails.orderServiceState == 4 && dataDetails.mailState == 0" @click.stop="applyPost">申请邮寄</span>
          <p class="remark" v-if="dataDetails.remark && showOther">{{dataDetails.remark}}</p>
        </div>
        <template v-if="dataDetails.orderBsVO && (dataDetails.dqyState===1 || dataDetails.orderServiceState>1)">
          <h3>公证签约材料</h3>
          <div class="tm_info">
            <h4>商标信息</h4>
            <p class="list mt20"><span>商标名称</span><span>{{dataDetails.orderBsVO.tmName}}</span></p>
            <p class="list mt20"><span>注册号</span><span>{{dataDetails.orderBsVO.regNo}}</span></p>
            <p class="list mt20"><span>商标类别</span><span class="cls">{{dataDetails.orderBsVO.cls}}</span></p>
            <p class="list mt20"><span>商标证书</span><span><img v-for="(imgInfo, index) in dataDetails.orderBsVO.tmCertificates" :key="index" :src="imgInfo.fileUrl" mode="aspectFit" @click="preview(imgInfo.fileUrl)"></span></p>
          </div>
          <div class="tm_info" v-if="dataDetails.orderBsVO.subjectType == 1">
            <h4>转让主体</h4>
            <p class="list mt20"><span>姓名</span><span>{{dataDetails.orderBsVO.subjectName}}</span></p>
            <p class="list mt20"><span>身份证号</span><span>{{dataDetails.orderBsVO.subjectIdno}}</span></p>
            <!-- <p class="list mt20">
              <span>身份证</span>
              <span>
                <img src="~assets/img/my/photo.png" mode="aspectFit"><img src="~assets/img/my/photo.png" mode="aspectFit">
              </span>
            </p> -->
          </div>
          <div class="tm_info" v-else>
            <h4>转让主体</h4>
            <p class="list mt20"><span>公司名称</span><span>{{dataDetails.orderBsVO.subjectName}}</span></p>
            <p class="list mt20"><span>统一社会信用代码</span><span>{{dataDetails.orderBsVO.subjectIdno}}</span></p>
            <p class="list mt20">
              <span>营业执照</span>
              <span>
                <img v-for="(imgInfo, index) in dataDetails.orderBsVO.subjectImgs" :key="index" :src="imgInfo.fileUrl" mode="aspectFit" @click="preview(imgInfo.fileUrl)">
              </span>
            </p>
          </div>
          <div class="tm_info" v-if="dataDetails.orderBsVO.assigneeType == 1">
            <h4>受让主体</h4>
            <p class="list mt20"><span>姓名</span><span>{{dataDetails.orderBsVO.assigneeName}}</span></p>
            <p class="list mt20"><span>身份证号</span><span>{{dataDetails.orderBsVO.assigneeIdno}}</span></p>
            <p class="list mt20"><span>身份证</span><span><img v-for="(imgInfo, index) in dataDetails.orderBsVO.assigneeImgs" :src="imgInfo.fileUrl" :key="index" mode="aspectFit" @click="preview(imgInfo.fileUrl)"></span></p>
          </div>
          <div class="tm_info" v-else>
            <h4>受让主体</h4>
            <p class="list mt20"><span>公司名称</span><span>{{dataDetails.orderBsVO.assigneeName}}</span></p>
            <p class="list mt20"><span>统一社会信用代码</span><span>{{dataDetails.orderBsVO.assigneeIdno}}</span></p>
            <p class="list mt20"><span>营业执照</span><span><img v-for="(imgInfo, index) in dataDetails.orderBsVO.assigneeImgs" :src="imgInfo.fileUrl" :key="index" mode="aspectFit" @click="preview(imgInfo.fileUrl)"></span></p>
          </div>
          <div class="tm_info" v-if="hasOtherImgs">
            <h4>其它</h4>
            <p class="list mt20"><span> </span><span><img v-for="(imgInfo, index) in dataDetails.orderBsVO.otherImgs" :src="imgInfo.fileUrl" :key="index" mode="aspectFit" @click="preview(imgInfo.fileUrl)"></span></p>
            <div class="photoWrap" v-if="showOther">
              <div class="photo" @click="chooseImage(8)">
                <img mode="aspectFill" v-if="false" src="~assets/img/order/timg1.jpg" alt="">
              </div>
              <div class="pic" v-for="(item, index) in imgArr" :key="index" @click="preview">
                <img class="img" :src="item.fileUrl" mode="aspectFill" alt="">
                <p @click.stop="chooseImage(8, index)">重新上传</p>
                <img src="~assets/img/icon/close.png" @click.stop="delImg(index)" class="close" alt="">
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- 付款按钮 -->
      <div class="btn_footer" v-if="dataDetails.orderState == 0">
        <div class="t row-between">
          <p class="lefttime"><span v-if="residueTime">剩余{{residueTime}}</span></p>
          <p class="action">
            <span class="cancel" @click="showPop(1)">取消</span>
            <span class="pay" @click="selfPay">付款</span>
          </p>
        </div>
        <div class="iphoneX" v-if="isIphoneX"></div>
      </div>
    </div>
    <!-- 没订单 -->
    <div class="null_single" v-if="!dataDetails">
      <img class="portrait" src="~assets/img/my/emptyImg.png">
      <div class="txt mb40">您还没有相关订单</div>
    </div>
    <u-message/>
    <!-- 弹窗 -->
    <u-modal :showModal="showModal" :options="options" :content="modalContent" @confirmBtn="confirmFn" @hide="hideFn" />
  </div>
</template>
<script>
  import Filters from '../../utils/filters.js';
  import interfaces from '@/api//interfaces';
  import mixin from 'mixins/';
  //import md5 from 'js-md5';
  let _timer;
  const { rootUrl } = CONFIG;
  export default{
  mixins: [mixin],
  data(){
    return{
      allMsg:true,
      dataDetails:{
        orderBsName: '',
        orderBsVO:{},
      },
      orderFictitiousSn:'',
      doubleClickState: false,
      residueTime:"",
      AllOrderBsCommissionRate:0,//总服务收益
      options: {
        confirmText: '确认',
        confirmColor: '#4272FF'
      },
      showModal:false,
      modalContent:'确认取消该订单吗？',
      showModalType: 1,
      showOther: false,
      imgArr:[],
      isIphoneX: false,
    }
  },
  onHide(){
    _timer && clearInterval(_timer)
  },
  onUnload(){
    console.log('离开当前页面')
    _timer && clearInterval(_timer);
  },
  onShow(){
    this.isIphoneX = this.judgeIsPhoneX();
    this.orderFictitiousSn = this.$root.$mp.query.orderSn;
    this.search()
    console.log(this.$root.$mp.query)
  },
  computed:{
    /*dataListInfo:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return this.dataDetails.serviceList.forEach((item) => {
          item.orderAmount = Filters.filters.priceformat(item.orderAmount);
          item.orderBsCommissionRate = Filters.filters.priceformat(item.orderBsCommissionRate);
          item.orderBsCommissionRate = Filters.filters.priceformat(item.orderBsCommissionRate);
          item.additionalProfit = Filters.filters.priceformat(item.additionalProfit);
          // item.orderFeedbackState = Filters.filters.worksState(item.orderFeedbackState);
          item.orderServiceState = Filters.filters.orderServiceState(item.orderServiceState);
        })
      },
      set (value) {
      }
    },*/
    hasOtherImgs () {
      let orderBsVO = this.dataDetails.orderBsVO;
      return (orderBsVO && orderBsVO.otherImgs && orderBsVO.otherImgs.length) || (orderBsVO && orderBsVO.otherImgs && !orderBsVO.otherImgs.length && this.showOther)
    },
    expiryTime () {
      return Filters.filters.dateFormat(this.dataDetails.expiryTime)
    },
    createTime () {
      return Filters.filters.dateFormat(this.dataDetails.createTime)
    },
    paymentTime () {
      return Filters.filters.dateFormat(this.dataDetails.paymentTime)
    },
    orderAmount () {
      return Filters.filters.priceformat(this.dataDetails.orderAmount)
    },
    orderPaymentTime () {
      return Filters.filters.dateFormat(this.dataDetails.orderPaymentTime)
    },
  },
  methods: {
    // 二次确认弹框
    showPop(showModalType) {
      this.showModalType = showModalType;
      this.modalContent = showModalType == 1 ? '确认取消该订单吗？' : '退款后该订单所提交信息将作废，确定退款？'
      this.showModal = true;
      this.orderFictitiousSn = this.dataDetails.orderSn;
    },
    // 图片预览
    preview (e) {
      if (e.target) {
        let index = e.target.dataset.index;
        let urls = this.imgArr.map(item => item.fileUrl);
        if (index) {
          wx.previewImage({
            current: urls[index-1], // 当前显示图片的http链接
            urls // 需要预览的图片http链接列表
          })
        }
        console.log(e)
      } else {
        wx.previewImage({
          current: e, // 当前显示图片的http链接
          urls: [e] // 需要预览的图片http链接列表
        })
      }
    },
    // fileType文件类型， index图片索引
    chooseImage (fileType, index) {
      console.log(typeof index)
      let count = index ? 1 : 9;
      wx.chooseImage({
        count: 1,
        sourceType: ['camera', 'album'],
        success: (res) => {
          console.log(res)
          let tempFilePaths = res.tempFilePaths;
          this.i = 0;
          this.upload(tempFilePaths, fileType, index)
        }
      })
    },
    upload (tempFilePaths, fileType, index) {
      let len = tempFilePaths.length;
      console.log('tempFilePaths', tempFilePaths, tempFilePaths[this.i], this.i)
      wx.uploadFile({
        header: Object.assign({}, interfaces.createAuthHeader(), {'content-type': 'multipart/form-data'}),
        url: `${rootUrl}/orderBs/UploadOrderBsFile`, //仅为示例，非真实的接口地址
        filePath: tempFilePaths[this.i],
        name: 'fileData',
        formData:{
          fileType,//index < 1000 ? '1030' : index,
          orderSn: this.orderSn
        },
        success: (res) => {
          console.log('res', res);
          if (res.statusCode == 200) {
            let data = JSON.parse(res.data);
            if (index === undefined) {
              this.imgArr = [...this.imgArr, ...[data] ]
            } else {
              // 替换图片
              this.$set(this.imgArr, index || 0, data)
            }
          }
          console.log(this.imgArr)
        },
        fail: res => {
          console.log('reserr', res)
        }
      })
    },
    // 删除图片
    delImg (index) {
      console.log(index)
      this.imgArr.splice(index, 1);
    },
    // 支付
    selfPay () {
      let item = this.dataDetails;
      if (this.doubleClickState) {
        return;
      }
      this.doubleClickState = true;
      let orderSn = item.orderSn;
      let paymentSn = item.orderPaymentSn;
      this.wechatPay(orderSn, paymentSn, (resp) => {
        this.doubleClickState = false;
        this.$router.push({ path: '/pages/order/submitMaterial', query: { orderSn } })
      }, (err) => {
        this.doubleClickState = false;
        console.log(err)
      });
    },
    toHome(){
      wx.switchTab({ url: '../index/my'})
    },
    copyNo(no) {
      wx.setClipboardData({
        data: no,
        success(res) {
          wx.getClipboardData({
            success(res) {
              console.log(res.data) // data
            }
          })
        }
      });
    },
    // 申请邮寄
    applyPost() {
      let orderSn = this.orderFictitiousSn;
      this.$router.push({
        path: '/pages/my/selectAddress',
        query: {
          orderSn
        }
      })
    },
    // 去签约
    toSigning() {
      let dqyState = this.dataDetails.dqyState;
      let orderSn = this.orderFictitiousSn;
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
    },
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
    // 补充材料
    toFill() {
      this.showOther = true;
    },
    // 补充材料 提交
    async toFillSubmit() {
      let orderSn = this.orderFictitiousSn;
      let fileUrls = this.imgArr.map(item => item.fileUrl);
      if (!fileUrls.length) {
        this.tips('请上传材料')
        return;
      }
      let resp = await this.API.orderBs.uploadAnnex(orderSn, fileUrls);
      this.showOther = false;
      this.imgArr = [];
      this.search();
    },
    callPhone(phone){
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },
    // 隐藏弹窗
    hideFn () {
      this.showModal = false;
    },
    // 弹窗回调
    async confirmFn (data) {
      if (data) {
        try {
          if (this.showModalType == 1) {
            await this.API.order.cancleOrder(this.orderFictitiousSn);
          } else {
            await this.API.order.wxRefund({
              outTradeNo: this.dataDetails.orderPaymentSn,
              totalFee: this.dataDetails.orderAmount
            });
            this.$message({content: '操作成功'})
          }
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
    async search(){//初始化
      let self = this;
      try {
        let resp = await this.API.order.selectOrderDetail(this.orderFictitiousSn);
        console.log(resp)
        if (resp.orderState == 0) {
          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#f64744',
            animation: {
              duration: 200,
              timingFunc: 'easeIn'
            }
          })
        }
        let item = resp;
        item.orderStateTxt = Filters.filters.orderState(item.orderState);
        item.orderServiceStateTxt = Filters.filters.orderServiceState(item.orderServiceState);
        let orderBsVO = item.orderBsVO;
        let orderBsFiles = item.orderBsVO.orderBsFiles || [];
        orderBsVO.tmCertificates = [];
        orderBsVO.subjectImgs = [];
        orderBsVO.otherImgs = [];
        orderBsFiles.forEach((it, i) => {
          if (it.fileType == '1') {
            // 商标注册证
            orderBsVO.tmCertificates = it.orderBsFiles;
          }
          if (it.fileType == '2') {
            // 商标注册证变更证明
            orderBsVO.tmCertificates = [...orderBsVO.tmCertificates, ...it.orderBsFiles];
          }
          if (it.fileType == '3') {
            // 商标受理通知书
            orderBsVO.tmCertificates = [...orderBsVO.tmCertificates, ...it.orderBsFiles];
          }
          if (it.fileType == '4') {
            // 身份证正面
            orderBsVO.subjectImgs = [...orderBsVO.subjectImgs, ...it.orderBsFiles];
          }
          if (it.fileType == '5') {
            // 身份证反面
            orderBsVO.subjectImgs = [...orderBsVO.subjectImgs, ...it.orderBsFiles];
          }
          if (it.fileType == '6') {
            // 机构营业执照
            orderBsVO.assigneeImgs = it.orderBsFiles;
          } else if (it.fileType == '7') {
            // 受让人身份证明材料 
            orderBsVO.assigneeImgs = it.orderBsFiles;
          }
          if (it.fileType == '8') {
            // 其它
            orderBsVO.otherImgs = it.orderBsFiles;
          }
        })
        this.dataDetails = resp;
        if (resp.orderBsVO && (resp.dqyState===1 || resp.orderServiceState>1)) {
          this.allMsg = false;
        }
        console.log('dataDetails：', this.dataDetails)
        if(resp.orderState == 0 && resp.leftTime && resp.leftTime>0){
          _timer = setInterval(function(){
            console.log('测试')
            resp.leftTime -= 1000;
            self.ShowCountDown(resp.leftTime);
          },1000);
        }else{
          this.residueTime = '';
        }
      }
      catch (e) {
      }
    },
    ShowCountDown(leftTime){
      let leftsecond = parseInt(leftTime/1000);
      let dayFirst=Math.floor(leftsecond/(60*60*24));
      let hour=Math.floor((leftsecond-dayFirst*24*60*60)/3600);
      let minute=Math.floor((leftsecond-dayFirst*24*60*60-hour*3600)/60);
      let second=Math.floor(leftsecond-dayFirst*24*60*60-hour*3600-minute*60);
      this.residueTime = dayFirst+"天"+hour+"小时"+minute+"分"+second+"秒";
      // console.log(this.residueTime)
    }
  },
  watch: {
  }
}
</script>
<style lang="scss">
@import "../../assets/css/variable";
.detail_info{
  min-height:100%;padding-bottom: 20px;padding-top: 20px;
  &.bgc01{
    padding-bottom: 118px;background: #f8f8f8 url(~assets/img/my/hight_bg.png) 0 top no-repeat;background-size: 750px 137px;
  }
  &.phoneXWrap{padding-bottom: 186px;}
  .detail_top{
    margin:0 20px 0;position: relative;
    .info_good{
      padding:20px;position: relative;background-color: #fff;border-radius:6px;
      .info_title{
        div{height:42px;line-height:42px;font-size:30px;color: #333;font-weight:600;}
        span{height:42px;line-height:42px;font-size:30px;color: #999;}
        .hight{color: #F64744;}
      }
      .info_tm_wrap{
        position:relative; background-color: #F8F8F8;
        .info_tm{
          padding: 20px;
          p{
            margin-top: 20px;
            span{
              line-height:40px;font-size:28px;color: #333;display: inline-block;max-width:480px;word-break: break-all;vertical-align: top;
              &:first-child{width: 134px;padding-right: 22px;color: #999999;}
            }
            &:first-child{margin-top: 0;}
          }
        }
        .info_tm_other{
          span{
            line-height:40px;font-size:28px;color: #333;display: inline-block;max-width:440px;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            &:first-child{width: 134px;padding-right: 22px;color: #999999;}
          }
        }
        p.tip{padding:0 20px 20px;height: 53px;font-size:24px;line-height:33px;color: #999999;}
        i.info_more{
          font-size: 20px;line-height: 38px;position: absolute; right: 20px; top: 20px;width:40px;height:40px;border: 1px solid #999; border-radius: 40px;text-align: center;color:#999;
        }
        i.up{transform: rotate(90deg);}
        i.down{transform: rotate(-90deg);}
      }
      .total{
        padding: 20px 0;
        p{
          font-size: 24px;color: #333;font-weight: 600;
          span{
            font-size: 30px;line-height: 42px;height: 42px;
            i{font-size: 24px;font-style: normal;}
          }
          span.hight{
            color: #F64744;
            i{color: #F64744;}
          }
        }
        >span{display: inline-block;width:145px;height:56px;border-radius:29px;text-align: center;border: 1px solid #ddd;font-size:26px;line-height: 54px;color: #333;}
      }
      .order_info{
        border-top:1px solid #eee;padding-top: 19px;
        .order_list{
          margin-top: 20px;
          &:first-child{margin-top: 0;}
          span{
            height:40px;line-height:40px;font-size:28px;color: #999;display: inline-block;
          }
        }
      }
    }
    .gz_info{
      width:100%;background:#fff;border-radius:6px;
      .gz_top{
        padding: 30px 20px;position: relative;
        .info_title{
          height:42px;line-height:42px;font-size:30px;color: #333;font-weight:600;
          span{height:42px;line-height:42px;font-size:30px;color: #F5A623;}
          .complete{color: #36AF47;}
        }
        .time, .remark{margin-top: 15px;height:40px;line-height:40px;font-size:28px;color: #999;}
        .remark{word-break: break-all;height:auto;}
        .fill, .sign{position: absolute; right: 20px; top: 25px; display: inline-block;width:145px;height:56px;border-radius:29px;text-align: center;background:linear-gradient(297deg,rgba(255,183,118,1) 0%,rgba(255,162,0,1) 100%);font-size:26px;line-height: 56px;color: #fff;}
      }
      >h3{padding-top: 30px;padding-left: 20px;font-size:30px;font-weight:600;height: 72px;line-height:42px;border-top:1px solid #eee;}
      .tm_info{
        border-bottom: 1px solid #eee;padding: 20px 0;margin: 0 20px;
        &:last-child{border: 0;}
        h4{height:42px;line-height:42px;font-size:30px;}
        .list{
          margin-top: 20px;display: flex;flex-direction: row;align-items: flex-start;justify-content: space-between;
          span{
            line-height:40px;font-size:28px;color: #333;display: inline-block;text-align:right;
            &:first-child{color: #999999;min-width: 150px;text-align:left;}
            &.cls{max-width:480px;word-break: break-all;vertical-align: top;}
            i{font-size:28px;line-height:40px;height:40px;color: #F64744;padding-left: 10px;}
            //.img{
              //width: 200px; height: 200px;
              img{width: 200px; height: 200px;margin-left: 10px;}
            //}
          }
        }
        .photoWrap{display: flex;flex-wrap: wrap;padding-top: 15px;justify-content: flex-end;
          >div{
            &:nth-child(3n+1){margin-left: 0 !important;}
          }
          .photo{width: 200px;height: 200px;background:rgba(236,238,242,1) url('../../assets/img/icon/phono.png') no-repeat 75px 80px;margin: 0 0 20px;font-size: 0;background-size: 50px 40px;
            img{width: 200px;height: 200px;}
          }
          .pic{margin: 0 0 20px 15px;position: relative;font-size: 0;
            .img{width: 200px;height: 200px;}
            p{line-height: 50px;text-align: center;background: #000;color: #fff;font-size: 24px;position: absolute;bottom: 0;left: 0;width: 100%;
            opacity: 0.5;}
            .close{width: 44px;height: 44px;position: absolute;top: 0;right: 0;padding: 10px 10px 0 0;}
          }
          .updateBtn{border: 1px solid #ddd;font-size: 24px;color:#333;line-height: 54px;text-align: center;border-radius: 28px;height: 56px;padding: 0 25px;margin: 144px 0 0 20px;}
        }
      }
    }

    .post_info{
      >h3{border-top:0;}
    }

    .btn_footer{
      width:100%;position: fixed;bottom:0;left:0;background-color: #fff;box-shadow:0px -2px 20px 0px rgba(147,2,0,0.08);
      div.t{
        height:98px;
        .lefttime{
          span{color:#F64744;font-size:26px;line-height:37px;padding-left: 30px;}
        }
        .action{
          span{display: inline-block;width:145px;height:56px;border-radius:29px;text-align: center;margin-right: 20px;}
          .cancel{border:1px solid #ddd;font-size:26px;line-height: 54px;color: #333;}
          .pay{background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%);font-size:26px;line-height: 56px;color: #fff;}
        }
      }
      .iphoneX{height: 68px;background: #fff;}
    }
  }
}
</style>
