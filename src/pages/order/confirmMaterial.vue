<template>
  <div class="confirmMaterialWrap" :class="[isIphoneX ? 'cphoneXWrap' : '']">
    <div class="trademark">
      <h2>商标信息</h2>
      <div class="infoItems">
        <div class="name">商标名称</div>
        <div class="des">{{form.tmName}}</div>
      </div>
      <div class="infoItems">
        <div class="name">注册号</div>
        <div class="des">{{form.regNo}}</div>
      </div>
      <div class="infoItems">
        <div class="name">商标类别</div>
        <div class="des">{{form.typeCls}}</div>
      </div>
      <div class="infoItems">
        <div class="name">商标证书</div>
        <img mode="aspectFill" @click="preview(item.fileUrl)" v-for="(item, index) in form.imgArr1" :key="index" :src="item.fileUrl" alt="">
        <!-- <img mode="aspectFill" src="~assets/img/order/timg1.jpg" alt=""> -->
      </div>
      <div class="tardemarkImg">
        <img mode="aspectFill" @click="preview(item.fileUrl)" v-for="(item, index) in form.imgArr2" :key="index" :src="item.fileUrl" alt="">
      </div>
    </div>
    <!-- 个人转让主体 -->
    <div class="trademark" v-if="form.subjectType == 1">
      <h2>转让主体</h2>
      <div class="infoItems">
        <div class="name">姓名</div>
        <div class="des">{{form.subjectName}}</div>
      </div>
      <div class="infoItems">
        <div class="name">身份证号</div>
        <div class="des">{{form.subjectIdno}}</div>
      </div>
      <!-- <div class="infoItems">
        <div class="name">身份证</div>
        <img mode="aspectFill" @click="preview(form['1133'].fileUrl)" :src="form['1133'].fileUrl" alt="">
        <img mode="aspectFill" @click="preview(form['1132'].fileUrl)" :src="form['1132'].fileUrl" alt="">
      </div> -->
    </div>
    <!-- 企业转让主体 -->
    <div class="trademark" v-if="form.subjectType == 2">
      <h2>转让主体</h2>
      <div class="infoItems">
        <div class="name">公司名称</div>
        <div class="des">{{form.subjectName}}</div>
      </div>
      <div class="infoItems">
        <div class="name">统一社会信用代码</div>
        <div class="des">{{form.subjectIdno}}</div>
      </div>
      <div class="infoItems">
        <div class="name">营业执照</div>
        <img mode="aspectFill" @click="preview(form['6'].fileUrl)" :src="form['6'].fileUrl" alt="">
      </div>
    </div>
    <!-- 企业受让主体 -->
    <div class="trademark" style="margin-bottom: 0;" v-if="form.assigneeType == 2">
      <h2>受让主体</h2>
      <div class="infoItems">
        <div class="name">公司名称</div>
        <div class="des">{{form.assigneeName}}</div>
      </div>
      <div class="infoItems">
        <div class="name">统一社会信用代码</div>
        <div class="des">{{form.assigneeIdno}}</div>
      </div>
      <div class="infoItems">
        <div class="name">营业执照</div>
        <img mode="aspectFill" @click="preview(form['7'].fileUrl)" :src="form['7'].fileUrl" alt="">
      </div>
    </div>
    <!-- 个人受让主体 -->
    <div class="trademark" style="margin-bottom: 0;" v-if="form.assigneeType == 1">
      <h2>受让主体</h2>
      <div class="infoItems">
        <div class="name">姓名</div>
        <div class="des">{{form.assigneeName}}</div>
      </div>
      <div class="infoItems">
        <div class="name">身份证号</div>
        <div class="des">{{form.assigneeIdno}}</div>
      </div>
      <div class="infoItems">
        <div class="name">身份证</div>
        <img mode="aspectFill" @click="preview(form['4'].fileUrl)" :src="form['4'].fileUrl" alt="">
        <img mode="aspectFill" @click="preview(form['5'].fileUrl)" :src="form['5'].fileUrl" alt="">
      </div>
    </div>
    <div class="nextStepWrap">
      <div class="warningInfo">信息提交公证处后不可修改，请仔细填写</div>
      <button type="button" class="nextStepBtn" @click="realNameDiaState = true">确认无误，立即提交</button>
      <div class="iphoneX" v-if="isIphoneX"></div>
    </div>
    
    <real-dia :showState="realNameDiaState" @close="realNameDiaState = false" >
      <div class="dia">
        <img src="../../assets/img/order/confirm.png" />
        <h2>请认真检查相关材料，提交公证处 将生成公证文书，且无法修改。</h2>
        <div class="realNameBtn" @click="confirm">提交</div>
      </div>
    </real-dia>
  </div>
</template>

<script>
import RealDia from 'components/realnameDialog';
import mixins from 'mixins/';
const form = { subjectId: 0, regNo: '', tmName: '', cls: '', orderBsFileVos: [], assigneeType: 1, subjectType: 1, '4': '','5': '','6': '', '7': '', };
import { _debounce } from 'utils/public';
export default {
  mixins: [mixins],
  data () {
    return {
      isIphoneX: false,
      realNameDiaState: false,
      form: Object.assign({}, form),
      orderSn: '',
      // jumpUrl: ''
    }
  },
  components: {
    RealDia
  },
  mounted () {
    this.isIphoneX = this.judgeIsPhoneX()
    console.log('isIphoneX', this.isIphoneX)
  },
  onShow () {
    // let data = await this.API.orderBs.startNotary(this.$route.query.orderSn);
    // this.jumpUrl = data.url;
    let pages = getCurrentPages();
    for (let i = 0, page; page = pages[i++];) {
      console.log(page.route)
      if (page.route.indexOf('order/webView') != -1) {
        wx.switchTab({
          url: '/pages/my/my'
        })
        break;
      }
    }
    console.log('pages', pages)
  },
  onLoad () {
    this.orderSn = this.$route.query.orderSn;
    this.form = this.$storage.get('materialArr')[this.orderSn];
    let trademarkImgArr = this.form.imgArr.concat(this.form.trademarkChangeImg, this.form.transationImg);
    this.form.imgArr1 = trademarkImgArr.slice(0, 2);
    this.form.imgArr2 = trademarkImgArr.slice(2);
    this.form.typeCls = this.form.cls.split(',').join('/');
  },
  methods: {
    // 图片预览
    preview (url) {
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      })
    },
    goRealName () {
      console.log('asdas')
    },
    submit () {},
    confirm: _debounce(async function () {
      let form = Object.assign({}, this.form);
      // if (this.jumpUrl) {
      //   this.$storage.set('signingUrl', this.jumpUrl);
      //   this.$router.push({path: '/pages/order/webView'})
      //   return;
      // }
      let data = await this.API.orderBs.createOrderBs({
        orderSn: this.orderSn,
        regNo: this.form.regNo,
        tmName: this.form.tmName,
        cls: this.form.cls,
        assigneeType: this.form.assigneeType,
        assigneeName: this.form.assigneeName,
        assigneeIdno: this.form.assigneeIdno,
        orderBsFileVos: this.form.orderBsFileVos
      });
      let materialArr = this.$storage.get('materialArr');
      delete materialArr[this.orderSn];
      this.$storage.set('materialArr', materialArr);
      this.realNameDiaState = false;
      this.$storage.set('signingUrl', data.url);
      this.$router.replace({path: '/pages/order/webView'});
    }, 800, true)
  }
}
</script>

<style lang="scss">
.confirmMaterialWrap{padding: 20px 20px 208px;
  .trademark{padding: 0 20px 20px;background: #fff;border-radius:6px;margin-bottom: 20px;
    h2{font-size: 30px;color: #333;line-height: 82px;border-bottom: 1px solid #eee;font-weight: 400;margin-bottom: 10px;}
    .infoItems{display: flex;line-height: 60px;border-radius:6px;
      .name{color: #999;flex-grow: 1;}
      .des{text-align: right;max-width: 500px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
      img{width: 200px;height: 200px;margin-left: 20px;margin-top: 20px;}
    }
  }
  .nextStepWrap{box-shadow:0px -2px 20px 0px rgba(147,2,0,0.08);background:rgba(255,255,255,1);padding: 20px;text-align: center;
  position: fixed;bottom: 0;left: 0;width: 100%;z-index: 10;
    .warningInfo{font-size: 24px;line-height: 33px;color: #ff9639;margin-bottom: 15px;}
    .nextStepBtn{display: block;padding: 0;border: none;line-height: 90px;color: #fff;font-size: 30px;background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%);border-radius: 50px;}
    .iphoneX{height: 68px;background: #fff;}
  }
  .realNameDia .realNameWrap .dia>img{height: 240px;}
  .tardemarkImg{font-size: 0;text-align: right;
    img{width: 200px;height: 200px;margin-left: 20px;margin-top: 20px;}
  }
}
.cphoneXWrap{padding-bottom: 276px;}
</style>
