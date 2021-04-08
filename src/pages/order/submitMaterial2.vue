<template>
  <div class="submitOrderWrap materialWrap" :class="[isIphoneX ? 'phoneXWrap' : '']">
    <div class="bgWrap">
      <div class="bgTop">
        <img mode="widthFix" src="~assets/img/order/submitBg.png" alt="">
      </div>
      <img src="~assets/img/order/bgBot.png" alt="">
    </div>
    <!-- tab -->
    <div class="materialTab" :class="['materialTab', 'materialTab'+tabIndex]">
      <div :class="{'materialTabItem': true, 'activeMaterialTab': tabIndex === 0 }">转让商标</div>
      <div :class="{'materialTabItem': true, 'activeMaterialTab': tabIndex === 1 }">转让主体</div>
      <div :class="{'materialTabItem': true, 'activeMaterialTab': tabIndex === 2 }">受让主体</div>
    </div>
    <div class="boldLine"></div>
    <!-- 转让商标表单 -->
    <!-- 转让主体 -->
    <div class="selfInfoWrap" v-if="tabIndex === 1" >
      <div class="orderForm queryCls" :style="{minHeight: selfInfoWrapHeight + 'px'}">
        <h3>请填写转让主体信息</h3>
        <!-- 个人 -->
        <template v-if="form.subjectType == 1">
          <div class="inputItem">
            <div class="des"><span>*</span>姓名</div>
            <input type="text" disabled v-model="form.subjectName" placeholder-class="placeholder" placeholder="请填写姓名" />
          </div>
          <div class="inputItem">
            <div class="des"><span>*</span>身份证号</div>
            <input type="text" disabled v-model="form.subjectIdno" :maxlength="18" placeholder-class="placeholder" placeholder="请输入身份证号" />
          </div>
        </template>
        <!-- 企业 -->
        <template v-else>
          <div class="inputItem">
            <div class="des"><span>*</span>公司名称</div>
            <input type="text" disabled v-model="form.subjectName" placeholder-class="placeholder" placeholder="请填写公司名称" />
          </div>
          <div class="inputItem">
            <div class="des"><span>*</span>统一社会信用代码</div>
            <input type="text" disabled v-model="form.subjectIdno" placeholder-class="placeholder" placeholder="请输入统一社会信用代码" />
          </div>
          <div class="inputItem" style="border: none;margin-bottom: 0;">
            <div class="des"><span>*</span>营业执照</div>
            <div class="photoWrap">
              <div class="photo" @click="chooseImage(6)">
                <img mode="aspectFill" @click.stop="preview(form['6'].fileUrl)" v-if="form['6']" :src="form['6'].fileUrl" alt="">
              </div>
              <div class="updateBtn" v-if="form['6']" @click="chooseImage(6)">重新上传</div>
            </div>
            <p class="phoneDes">请上传转让企业营业执照扫描件或清晰照片。</p>
          </div>
        </template>
      </div>
    </div>
    <!-- 受让主体 -->

    <!-- 下一步 -->
    <div class="nextStepWrap queryCls">
      <div class="warningInfo">信息提交公证处后不可修改，请仔细填写</div>
      <button type="button" :class="['nextStepBtn', btnState ? '' : 'btnDisabled']" @click="nextStep">下一步</button>
      <div class="iphoneX" v-if="isIphoneX"></div>
    </div>
    <u-message/>
  </div>
</template>

<script>
import interfaces from '@/api/interfaces';
import mixins from 'mixins/';
import { _debounce } from 'utils/public';
const form = { subjectId: 0, regNo: '', tmName: '',applicantCn: '', cls: '', assigneeIdno: '', orderBsFileVos: [], assigneeType: 1, subjectType: 1 };
const { rootUrl } = CONFIG;
import { Validator, strategys } from 'utils/valid';
export default {
  mixins: [mixins],
  data () {
    return {
      tabIndex: 1,
      checkedTrademark: [],
      form: Object.assign({}, form),
      isIphoneX: false,
      imgArr: [], // 商标注册证书图片列表
      transationImg: [], // 商标受理图片列表
      trademarkChangeImg: [], // 商标变更证明图片
      imgObj: {},
      loading: false, // 上传状态
      selfInfoWrapHeight: 526,
      i: 0,
      orderSn: '',
      companyListStatus: false,
      companyList: [],
      materialArr: {} // 
    }
  },
  computed: {
    btnState () {
      if (this.tabIndex === 0 && this.form.regNo && this.form.applicantCn && this.form.tmName && this.checkedTrademark.length && (this.imgArr.length || this.trademarkChangeImg.length || this.transationImg.length)) {
        return true;
      }
      if (this.tabIndex == 1 && (this.form.subjectType == 1 || this.form.subjectType == 2 && this.form[6])) {
        return true;
      }
      if (this.form.assigneeIdno && this.form.assigneeName && (this.form['7'] && this.form.assigneeType == 2 || this.form['4'] && this.form['5'] && this.form.assigneeType == 1) && this.tabIndex == 2) {
        return true
      }
      return false;
    }
  },
  components: {
  },
  mounted () {
    this.isIphoneX = this.judgeIsPhoneX()
  },
  onShow () {
    console.log('orderSn', this.$route.query.orderSn)
    let mateArr = this.$storage.get('materialArr') || [];
    if (!mateArr[this.$route.query.orderSn]) {
      wx.switchTab({
        url: '/pages/my/my'
      })
    }
  },
  onLoad () {
    wx.getSystemInfo({
      success: (res) => {
        wx.nextTick(() => {
          var query = wx.createSelectorQuery();
          query.selectAll('.queryCls').boundingClientRect();
          query.exec( (resp)  => {
            let hei = res.windowHeight - resp[0][0].top - resp[0][1].height - 15;
            this.selfInfoWrapHeight = this.isIphoneX ?  hei - 24 : hei;
            console.log('resp', resp, resp[0], this.selfInfoWrapHeight, res.windowHeight)
          });
        })
        // this.selfInfoWrapHeight = res.windowHeight - 141 - 15;
      }
    });
    this.form = Object.assign({}, form);
    this.init();
  },
  methods: {
    selectCompany (item) {
      this.form.assigneeName = item;
      this.searchCompany();
      this.companyListStatus = false;
    },
    handleChangeCompany: _debounce(async function () {
      console.log('searchCompany', this.form.assigneeName)
      if (!this.form.assigneeName) {
        this.companyList = [];
      }
      if (this.form.assigneeName.length < 4) {
        return;
      }
      this.companyList = [];
      this.companyListStatus = true;
      let data = await this.API.subject.companyFilter({keyword: this.form.assigneeName});
      this.companyList = data;
    }, 500, false),
    async searchCompany () {
      setTimeout(() => {
        this.companyListStatus = false;
      }, 800)
      if (this.form.assigneeName.length > 2 && this.form.assigneeType === 2) {
        let data = await this.API.subject.companyDetail({content: this.form.assigneeName});
        this.form.assigneeIdno = data.creditcode ? data.creditcode : '';
        console.log('this.form', this.form)
      }
    },
    // 初始化查询订单信息
    async init () {
      this.$storage.remove('signingUrl');
      this.orderSn = this.$route.query.orderSn;
      this.materialArr = this.$storage.get('materialArr') ? this.$storage.get('materialArr') : {};

      console.log('initForm', this.form, this.imgArr)
      if (this.materialArr[this.orderSn]) {
        this.form = Object.assign({}, this.form, this.materialArr[this.orderSn]);
        this.imgArr = this.form.imgArr ? this.form.imgArr : [];
        this.trademarkChangeImg = this.form.trademarkChangeImg ? this.form.trademarkChangeImg : [];
        this.transationImg = this.form.transationImg ? this.form.transationImg : [];
      }
      this.checkedTrademark = this.form.cls ? this.form.cls.split(',') : [];
    },
    //
    selectSubject (type) {
      this.form.assigneeType = type;
      this.form.assigneeIdno = '';
      this.form.assigneeName = '';
    },
    // 删除图片
    delImg (index, type) {
      console.log(index)
      if (type == 1) {
        this.imgArr.splice(index, 1);
      } else if (type == 2) {
        this.trademarkChangeImg.splice(index, 1);
      } else {
        this.transationImg.splice(index, 1);
      }
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
    nextStep () {
      if (this.tabIndex == 1) {
        this.form.orderBsFileVos = this.form.orderBsFileVos.filter(item => item.fileType != 6);
        if (this.form.subjectType == 2) {
          if (!this.form['6']) {
            this.tips('请上传转让主体营业执照');
            return;
          }
          this.form.orderBsFileVos.push(this.form['6']);
          this.materialArr = this.$storage.get('materialArr') ? this.$storage.get('materialArr') : this.materialArr;
          this.materialArr[this.orderSn] = this.form;
          this.materialArr[this.orderSn] = Object.assign({}, this.materialArr[this.orderSn], this.form);
          this.$storage.set('materialArr', this.materialArr);
        } else if (this.form.subjectType == 1) {
          if (!this.form.subjectName) {
            return;
          }
        }
        this.$router.push({path: '/pages/order/submitMaterial3', query: {orderSn: this.orderSn}});
      }
    },
   // fileType文件类型， index是图片索引+1
    chooseImage (fileType, index) {
      console.log(typeof index)
      if(this.loading){
        return;
      }
      let count;
      if (index) {
        count = 1;
      } else {
        if (fileType == 1) {
          count = 10 - this.imgArr.length;
        } else if (fileType == 2) {
          count = 10 - this.trademarkChangeImg.length;
        } else if (fileType == 3) {
          count = 10 - this.transationImg.length;
        } else {
          count = 1;
        }
      }
      // let count = !index && (fileType == 1 || fileType == 2 || fileType == 3) ? 100 : 1;
      wx.chooseImage({
        count,
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
      this.loading = true;
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
          this.loading = false;
          if (res.statusCode == 200) {
            let data = JSON.parse(res.data);
            if (fileType == '4' || fileType == '5') {
              data.fileType = 7;
            } else {
              data.fileType = fileType;
            }
            if (index) { // 替换图片
              if (fileType == 1) {
                this.$set(this.imgArr, index-1, data)
              } else if (fileType == 2) { // 变更证明
                this.$set(this.trademarkChangeImg, index-1, data);
              } else if (fileType == 3) { // 受理通知书
                this.$set(this.transationImg, index-1, data);
              }
            } else { // 批量上传商标证、变更证明、受理通知书
              let respData = data;
              if (fileType == 1) {
                this.imgArr.push(respData);
              } else if (fileType == 2) { // 变更证明
                this.trademarkChangeImg.push(respData);
              } else if (fileType == 3) { // 受理通知书
                this.transationImg.push(respData);
              } else { // 上传其他类型材料
                fileType = fileType + '';
                this.$set(this.form, fileType, respData);
                console.log('this.form', this.form)
              }
              this.i++;
              if (this.i < len) {
                this.upload(tempFilePaths, fileType);
              } else {
                this.imgArr = [...new Set(this.imgArr)];
                this.trademarkChangeImg = [...new Set(this.trademarkChangeImg)];
                this.transationImg = [...new Set(this.transationImg)];
                this.loading = false;
              }
            }
          }
          console.log(this.imgArr)
        },
        fail: res => {
          this.loading = false;
          console.log('reserr', res)
        }
      })
    },
    hideFn () {
      this.$router.push('/pages/order/addSubject')
    },
    // 自动查询商标信息
  },
  watch: {
  }
}
</script>

<style lang="scss">
@import "../../assets/css/variable";
page{height: 100%;}
.submitOrderWrap{padding-bottom: 128px;min-height: 100%;
  .bgWrap{height: 407px;font-size: 0;overflow-x: hidden;
    .bgTop{height: 387px;background:linear-gradient(180deg,rgba(246,71,68,1) 0%,rgba(246,123,68,1) 100%);
      >img{width: 100%;margin-top: 30px;}
    }
    >img{width: 100%;margin-top: -1px;height: 20px;font-size: 0;}
  }
  .submitMain, .selfInfoWrap{margin: -303px 20px 0;z-index: 10;position: relative;width: 710px;}
}
  .bankWrap{position: absolute;top: 114px;left: 0;z-index: 100;background: #fff;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);width: 100%;
  padding: 10px 30px;height: 340px;overflow-y: auto;border-radius: 4px;transition: all .2s;
    .bankItem{line-height: 70px;color: #909090;font-size: 26px;}
  }
.materialWrap{padding: 0 0 208px;position: relative; overflow-x: hidden;
  .submitMain{
    .orderForm {margin-top: 0;}
  }

  .materialTab{display: flex;position: absolute;top: 20px;left: 273px;width: 100%;transition: all 0.3s ease;
    .materialTabItem{line-height: 50px;font-size: 28px;font-weight: 400;padding: 0 30px;color: #fff;opacity: 0.5;transition: all 0.3s ease;}
    .activeMaterialTab{font-size: 36px;font-weight: 600;opacity: 1;}
  }
  .orderForm{margin-top: 0;
    // .idCardWrap{height: 401px;}
    .subjectWrap{display: flex;margin: 20px 60px 20px 0;float: left;
      .radioWrap{width: 40px;height: 40px;border: 1px solid #bbb;border-radius: 20px;display: flex;align-items: center;
        justify-content: center;
        .radio{width: 20px;height: 20px;background: #f64744;border-radius: 10px;}
        &.red{border-color: #f64744;}
      }
      .typeDes{margin-left: 15px;font-size: 28px;color: #333;line-height: 40px;}
    }
    .photoWrap{display: flex;flex-wrap: wrap;padding-top: 15px;
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
    .phoneDes{font-size: 24px;color: #999;line-height: 33px;}
    .idCard{margin-top: 30px;display: flex;
      >div{
        .updateBtn{border: 1px solid #ddd;font-size: 24px;color:#333;line-height: 54px;text-align: center;border-radius: 28px;height: 56px;
        margin: 15px auto 0;width: 145px;}
      }
      .front, .reverse{width: 300px;height: 260px;background: #ECEEF2;position: relative;font-size: 0;
        img{width: 300px;height: 200px;}
        .des{position: absolute;width: 100%;line-height: 33px;text-align: center;padding-bottom: 15px;bottom: 0;left: 0;font-size: 24px;color: #666;}
        .redBg{width: 100px;height: 100px;border-radius: 50px;background:rgba(246,71,68,1);opacity: 0.6;text-align: center;display: flex; align-items: center;justify-content:center;transform: translate(100px, 61px);
          img{width: 47px;height: 40px;}
         }
      }
      .reverse{background:#ECEEF2 url('../../assets/img/order/reverse.png') no-repeat 20px 20px;background-size: 260px 180px;}
      .front{margin-right: 30px;background:#ECEEF2 url('../../assets/img/order/front.png') no-repeat 20px 20px;background-size: 260px 180px;}
    }
  }
  .boldLine{position: absolute;top: 80px;left: 360px;height: 4px;width: 30px;border-radius: 2px;background: #fff;}
  .materialTab1{left: 101px;}
  .materialTab2{left: -74px;}
  .nextStepWrap{box-shadow:0px -2px 20px 0px rgba(147,2,0,0.08);background:rgba(255,255,255,1);padding: 20px;text-align: center;
  position: fixed;bottom: 0;left: 0;width: 100%;z-index: 10;
    .warningInfo{font-size: 24px;line-height: 33px;color: #ff9639;margin-bottom: 15px;}
    .nextStepBtn{display: block;padding: 0;border: none;line-height: 90px;color: #fff;font-size: 30px;background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%);border-radius: 45px;}
    .iphoneX{height: 68px;background: #fff;}
  }
  .btnDisabled{opacity: 0.5;}
}
.phoneXWrap{
  padding-bottom: 276px;
}
 
</style>
