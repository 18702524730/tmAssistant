<template>
  <div :class="['submitOrderWrap', isIphoneX ? 'iphoneXOrderWrap' : '']"
  :style="{'height': minsVisible ? '100%' : 'auto', 'overflow-y': minsVisible ? 'hidden' : 'auto'}">
    <div class="bgWrap">
      <div class="bgTop">
        <img mode="widthFix" src="~assets/img/order/submitBg.png" alt="">
      </div>
      <img src="~assets/img/order/bgBot.png" alt="">
    </div>
    <div class="submitMain">
      <div class="tabWrap">
        <div class="itemsWrap">
          <div :key="0" @click="clickTab(1)" :class="['tabItem', type == 1 ? 'activeTab' : '']">个人转让</div>
          <div :key="1" @click="clickTab(2)" :class="['tabItem', type == 2 ? 'activeTab' : '']">企业转让</div>
        </div>

        <div class="tabContent" :class="{'tabContent2': type === 2}" @click="handleClickTabContent">
          <div class="empty" v-if="(type === 1 && !personalSubject.name) || (type === 2 && !checkCompany.id)">
            <h2 v-if="type === 1">请添加个人转让主体</h2>
            <h2 v-else>{{companySubject.length ? '请选择企业转让主体' : '请添加企业转让主体'}}</h2>
          </div>
          <!-- 个人未添加主体 -->
          <!-- <div class="personNoAuth" v-if="type === 1 && !personalSubject.name && isLogin">
            {{phone}}
          </div> -->
          <!-- 个人已认证、未认证 -->
          <div class="personAuth" v-if="checkSubject.id">
            <div class="name">
              <p>{{checkSubject.name}}</p>
            </div>
            <p>{{checkSubject.idNo}}</p>
          </div>
          <i class="icon iconfont icon-jiantou" v-if="!(checkSubject.name&&checkSubject.type === 1)"></i>
        </div>
      </div>
      <div class="orderForm">
        <h3>请填写商标信息</h3>
        <div class="inputItem">
          <div class="des"><span>*</span>注册号</div>
          <input type="text" v-model="form.regNo" @blur="searchTrademark" placeholder-class="placeholder" :maxlength="12" placeholder="请输入商标注册号" />
        </div>
        <div class="inputItem">
          <div class="des"><span>*</span>商标持有人</div>
          <input type="text" v-model="form.applicantCn" :maxlength="60" placeholder-class="placeholder" placeholder="请输入商标持有人" />
        </div>
        <div class="inputItem">
          <div class="des"><span>*</span>商标名称</div>
          <input type="text" v-model="form.tmName" :maxlength="60" placeholder-class="placeholder" placeholder="请输入商标名称" />
        </div>
        <div class="inputItem" style="border: none;margin-bottom: 0;">
          <div class="des"><span>*</span>商标类别(多选)</div>
          <div class="trademarkType" @click="clickTrademarkItem">
            <div v-for="item in cateIdData" :data-num="item.id" :key="item.id" 
            :class="['trademarkItem', item.checked ? 'checkedTrademark' : '']" >{{item.id}}</div>
            <p>请保证注册号与商标类别相匹配，允许同时勾选同一注册号下的多个类别。</p>
          </div>
        </div>
      <div class="btn_footer">
        <div class="row-between">
          <p class="btn_l">共计 <span class="symbol">￥</span><span class="num">{{price}}</span></p>
          <p class="btn_r" @click="submit">提交订单</p>
        </div>
        <div v-if="isIphoneX" class="iphoneX"></div>
      </div>
      </div>
    </div>
    <!-- 主体列表弹框列表 -->
    <div class="transition_up" :class="['transition_up', minsVisible ? 'show_animation' : 'hide_animation']">
      <div class="mask_bg"  @click="minsVisible = false"></div>
      <div class="transition_wrap" >
        <div class="popup_wrap">
          <div class="chooseMin">
            <div class="top_header">
              请选择企业转让主体
              <label @click="minsVisible = false">取消</label>
            </div>
          </div>
          <div class="mid_content" :class="['mid_content', isIphoneX ? 'mid_content_X' : '']">
            <scroll-view class="categoryItemMinWrap" scroll-y="true" @scroll="handleScroll">
              <div class="companyItemWrap" v-for="(item, index) in companySubject" :key="index" @click="handleClickCompany(index)">
                <!-- 已选中 -->
                <img v-if="item.checked" src="../../assets/img/icon/check1.png" alt="">
                <!-- 未选中 -->
                <!-- <img v-if="!item.checked&&item.isVerified" src="../../assets/img/icon/check2.png" alt=""> -->
                <img v-if="!item.checked" src="../../assets/img/icon/check2.png" alt="">
                <!-- 不可选 -->
                <!-- <img v-if="!item.isVerified" src="../../assets/img/icon/check3.png" alt=""> -->
                <div class="company">
                  <div class="name">
                    <p>{{item.name}}</p>
                    <!-- <img mode="aspectFit" src="../../assets/img/icon/noAuth.png" alt=""> -->
                  </div>
                  <p>{{item.idNo}}</p>
                </div>
                <div class="option" @click.stop="delSubject(item.id)">删除</div>
              </div>
              <!-- <p class="subjectDes">主体需完成认证后才可进行公证，最多可添加10个企业主体</p> -->
            </scroll-view>
          </div>
          <div class="bt_footer" :class="['bt_footer', isIphoneX ? 'bt_footer_X' : '']" @click="hideFn">
            <img src="../../assets/img/icon/addIcon.png" mode="accpetFit" alt="">
            添加企业主体
          </div>
        </div>
      </div>
    </div>
    <!-- 实名弹框 -->
    <real-dia :showState="realNameDiaState" @close="realNameDiaState = false" >
      <div class="dia">
        <img src="../../assets/img/order/dia.png" />
        <h2>根据公证处要求，在完成转让公证前，须先<i>实名认证</i></h2>
        <div class="realNameBtn" @click="goRealName">立即认证</div>
      </div>
    </real-dia>
    <u-message/>
  </div>
</template>

<script>
import cateIdData from 'utils/tmTypeData';
import RealDia from 'components/realnameDialog';
import mixins from 'mixins/';
import { _debounce } from 'utils/public';
import { Validator, strategys } from 'utils/valid';
import qs from 'qs';
const form = { subjectId: 0, regNo: '', tmName: '', cls: '', applicantCn: '' };
export default {
  mixins: [mixins],
  data () {
    return {
      type: 1,
      cateIdData: cateIdData.cateIdData, // 45类商标类别
      minsVisible: false,
      phone: '',
      form: Object.assign({}, form) ,
      isIphoneX: false,
      isLogin: false,
      loading: false,
      price: '360.00',
      realNameDiaState: false,
      personalSubject: {},
      currentSubjectId: '', // 刚添加的主体ID
      companySubject: [],
      checkCompany: {}, // 选中的企业
      checkSubject: {}, // 选中的主体
      checkedTrademark: [] // 选中的商标类别
    }
  },
  components: {
    RealDia
  },
  mounted () {
  },
  onShow () {
    console.log('type', this.type)
    this.init()
  },
  onLoad () {
    this.form = Object.assign({}, form);
    this.cateIdData.forEach(item => {
      item.checked = false;
    })
    this.phone = this.$storage.get('auth') ? this.$storage.get('auth').phone : '';
    this.price = this.$route.query.price ? this.$route.query.price : '360.00';
    // this.init()
  },
  // onUnload () {
  //   console.log('unload', this.type)
  // },
  methods: {
    init () {
      // this.checkSubject = {};
      let subjectObj = this.$storage.get('subjectObj') ? this.$storage.get('subjectObj') : '';
      if (subjectObj) {
        this.type = subjectObj.type;
        this.currentSubjectId = subjectObj.id;
        this.$storage.remove('subjectObj');
      }
      this.personalSubject = {};
      this.companySubject = [];
      this.isLogin = this.$storage.get('key') ? true : false;
      this.isIphoneX = this.judgeIsPhoneX();
      this.getSubjectList();
      // if (this.$route.query.type && this.$route.query.price) {
      this.form = this.$storage.get('orderForm') ? this.$storage.get('orderForm') : Object.assign({}, form);
      this.cateIdData = this.$storage.get('cateIdData') ? this.$storage.get('cateIdData') : cateIdData.cateIdData;
      // }
      console.log('query', this.$mp, this.$root.$mp)
    },
    // 删除主题
    async delSubject (id) {
      wx.showModal({
        title: '',
        content: '确定删除该企业转让主体信息吗？',
        cancelColor: '#000000',
        confirmColor: '#F64744',
        success: async (res) => {
          if (res.confirm) {
            await this.API.subject.deleteSubject({id});
            if (this.checkCompany.id == id) {
              this.checkCompany = {};
              this.checkSubject = {};
            }
            this.getSubjectList();
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    clickTab (type) {
      this.type = type;
      if (type === 1) {
        this.checkSubject = this.personalSubject;
        this.currentSubjectId = '';
      } else {
        this.checkSubject = this.checkCompany;
      }
    },
    handleClickCompany (index) {
      // if (this.companySubject[index].isVerified) {
        this.companySubject[index].checked = true;
        this.checkCompany = this.companySubject[index];
        this.checkSubject = this.companySubject[index];
        this.minsVisible = false;
        this.currentSubjectId = '';
      // } else {
      //   this.minsVisible = false;
      //   this.realNameDiaState = true;
      // }
    },
    // 自动查询商标信息
    async searchTrademark () {
      // if (this.form.regNo.length > 3 && !this.form.tmName && !this.checkedTrademark.length) {
      if (this.form.regNo.length > 3) {
        let data = await this.API.subject.getTradeMarkInfo({regNo: this.form.regNo});
        this.form.tmName = data.tmName;
        this.form.applicantCn = data.applicantCn;
        this.checkedTrademark = data.cls ? data.cls.split(',') : [];
        this.cateIdData.forEach(item => {
          item.checked = false;
        })
        this.checkedTrademark.forEach(item => {
          this.cateIdData[item-1].checked = true;
        })
      }
    },
    // 获取主体信息
    async getSubjectList () {
      this.loading = true
      try{
        let data = await this.API.subject.subjectList();
        this.companySubject = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == 1) {
            this.personalSubject = data[i];
            this.type == 1 ? this.checkSubject = data[i] : '';
          } else {
            // 添加企业主体时返回勾选中刚添加的企业主体
            if (this.type == 2 && this.currentSubjectId) {
              data[i].checked = true;
              console.log('currentSubjectId', this.currentSubjectId)
              if (this.currentSubjectId == data[i].id) {
                this.checkSubject = data[i];
                this.checkCompany = data[i];
                console.log('checksub', this.checkSubject)
              }
            }
            if (data[i].id == this.checkSubject.id) {
              data[i].checked = true
            } else {
              data[i].checked = false;
            }
            this.companySubject.push(data[i]);
          }
        }
        this.loading = false;
      } catch (error) {
        console.log('error', error)
        error.then(async (res) => {
          this.isLogin = res.isLogin;
          res.isLogin ? await this.getSubjectList() : ''
          this.loading = false;
          console.log('loading', this.loading)
        }, () => {
          this.loading = false;
        })
      } finally {
        // this.loading = false;
      }
    },
    validaFunc () {
      var validator = new Validator();
      // 添加验证规则
      validator.add(this.checkSubject.id, 'isNotEmpty', '请选择转让主体')
      validator.add(this.form.regNo, 'isNotEmpty', '请输入商标注册号')
      validator.add(this.form.applicantCn, 'isNotEmpty', '请输入商标持有人')
      validator.add(this.form.regNo, 'trademarkFormat', '商标注册号格式不正确')
      validator.add(this.form.tmName, 'isNotEmpty', '请输入商标名称')
      validator.add(this.checkedTrademark.join(','), 'isNotEmpty', '请选择商标类别')
      var errorMsg = validator.start();
      return errorMsg;
    },
    // 提交订单
    submit: _debounce(async function () {
      if (!this.isLogin) {
        this.$router.replace('/pages/login/login?showAuthorize=' + true + '&price=' + this.price)
        return;
      }
      this.form.cls = this.checkedTrademark.join(',');
      // 规则验证
      var errorMsg = this.validaFunc();
      if(errorMsg){
        this.tips(errorMsg);
        return false;
      }
      if (this.form.applicantCn != this.checkSubject.name) {
        wx.showModal({
          title: '',
          content: '转让主体与商标持有人不一致，请修改转让人信息',
          cancelColor: '#000000',
          confirmColor: '#F64744',
          success: (res) => {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return;
      }
      this.form.subjectId = this.checkSubject.id;
      let data = await this.API.order.createOrder(this.form);
      this.$storage.remove('orderForm');
      this.$storage.remove('cateIdData');
      this.$router.push({path: '/pages/order/checkstand', query: data})
    }, 800, true),
    handleClickTabContent () {
      if (!this.isLogin&&!this.loading) {
        this.$storage.set('orderForm', this.form);
        this.$router.replace(`/pages/login/login?showAuthorize=true&price=${this.price}`)
        return;
      }
      if (this.type == 1) {
        if (this.personalSubject.id || this.loading) {
          // this.realNameDiaState = true;
          return;
        }
        this.$storage.set('orderForm', this.form);
        this.$storage.set('cateIdData', this.cateIdData);
        this.$router.push( `/pages/order/addSubject?type=${this.type}&price=${this.price}`)
      } else {
        this.companySubject.forEach(item => {
          item.checked = item.id == this.checkSubject.id ? true : false;
        });
        
        this.minsVisible = true;
      }
    },
    hideFn () {
      this.$storage.set('orderForm', this.form);
      this.$storage.set('cateIdData', this.cateIdData);
      this.$router.push( `/pages/order/addSubject?type=${this.type}&price=${this.price}`);
      this.minsVisible = false;
    },
    // 商标大类点击事件
    clickTrademarkItem (e) {
      if (!e.target.dataset.num) {
        return
      }
      let num = e.target.dataset.num;
      let index = this.checkedTrademark.indexOf(num);
      if (index === -1) {
        this.checkedTrademark.push(num);
        this.cateIdData[num-1].checked = true;
      } else {
        this.checkedTrademark.splice(index, 1);
        this.cateIdData[num-1].checked = false;
      }
      console.log(this.checkedTrademark)
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/css/variable";
page{height: 100%;}
.submitOrderWrap{padding-bottom: 128px;
  .bgWrap{height: 407px;font-size: 0;overflow-x: hidden;
    .bgTop{height: 387px;background:linear-gradient(180deg,rgba(246,71,68,1) 0%,rgba(246,123,68,1) 100%);
      // >div{background:url('../../assets/img/order/submitBg.png') 0 0 no-repeat;height: 387px;}
      >img{width: 100%;margin-top: 30px;}
    }
    >img{width: 100%;margin-top: -1px;height: 20px;font-size: 0;}
  }
  .submitMain{margin: -387px 20px 0;z-index: 10;position: relative;width: 710px;
    .tabWrap{
      .itemsWrap{display: flex;
        .tabItem{width: 340px;height: 81px;background: rgba(255,255,255, 1);line-height: 81px;opacity: 0.9;font-size: 28px;color: #333;text-align: center;margin: 0 10px;border-radius:6px 6px 0px 0px;transition: all 0.2s ease;}
        .activeTab{opacity: 1;flex-grow: 1;margin: 0;}
      }

      .tabContent{background: #fff;clear: both;padding: 0 40px;border-radius:0px 6px 6px 6px;width: 710px;position: relative;margin-top: -1px;
        height: 157px;overflow-y: hidden;
        .empty{line-height: 157px;
          h2{font-size: 30px;font-weight: 600;}
        }
        .personNoAuth{line-height: 157px;font-size: 30px;color: #333;font-weight: 600;
          img{width: 83px;height: 30px;transform: translateY(4px);margin-left: 10px;}
          // i{border: 1px solid #F5A623;;font-size: 18px;font-weight: 400;padding: 5px 13px;line-height: 1;color: #F5A623;border-radius: 18px;
          // margin-left: 10px;transform: translateY(-4px);}
        }
        .personAuth{padding: 30px 0;
          .name{display: flex;
          p{line-height: 42px;color: #333;font-size: 30px;font-weight: 600;max-width: 480px;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;padding: 0;}
          img{height: 30px;width: 98px;transform: translateY(6px);margin-left: 10px;}
          }
          p{font-size: 28px;color: #999;line-height: 40px;padding-top: 15px;}
          .iconWrap{font-size: 18px;background:linear-gradient(104deg,rgba(159,216,142,1) 0%,rgba(98,185,78,1) 100%);
          padding: 0px 14px 0 10px;border-radius: 18px;height: 32px;margin: 4px 0 0 10px;
            i{color: #fff;line-height: 30px;}
            icon{transform: translateY(-2px);margin-right: 8px;}
          }
        }
        .icon{font-size: 20px;color: #ddd;position: absolute;top: 59px;right: 30px;display: block;width: 40px;height: 40px;line-height: 40px;text-align: center;}
      }
      .tabContent2{border-radius:6px 0px 6px 6px;}
    }
    .btn_footer{width:100%;position: fixed;bottom:0;left:0;background: #fff;
      div{width:100%;box-shadow:0px -2px 20px 2px rgba(147,2,0,0.10);
        p{height:100%;font-size:$text-xl;text-align:center;line-height:96px;height: 96px;overflow: hidden;}
        .btn_l{background-color:#fff;color:#000;font-size:28px;width:450px;text-align:left;padding-left: 30px;
          span{color:#F64744;}
          .symbol{font-size:28px;}
          .num{font-size:34px;font-weight:600;}
        }
        .btn_r{background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%);color:#fff;width:300px;}
      }
      .iphoneX{height: 68px;background: #fff;}
    }
  }
    .transition_up {
      position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: -1;
      .mask_bg {position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 9000;display: none;}
      .transition_wrap {
        position:fixed; left:0; bottom: 0; z-index:9001; width: 100%; height: auto; background: #fff; box-shadow:0px -10px 30px 0px rgba(47,128,246,0.09); border-radius:10px 10px 0px 0px; overflow: hidden;
      }
    }
    .show_animation {z-index: 8999;animation: moveUp 0.3s ease-out; bottom: 0;
      .mask_bg {animation: fadeIn 0.3s ease-out; display:block;}
      .transition_wrap {animation: moveUp 0.3s ease-out; bottom: 0;}
    }
    .hide_animation {animation: moveDown 0.3s ease-out; bottom: -100%;
      .mask_bg {display:none;}
      .transition_wrap {animation: moveDown 0.3s ease-out; bottom: -100%;}
    }
    .popup_wrap{
      position: relative;width: 100%;
      .chooseMin{
        height: 102px;line-height: 42px;padding: 30px;border-bottom: 1px solid #eee;
        .top_header{text-align: center;font-size: 30px;position: relative;}
        label{color: #999;font-size: 30px;position: absolute;left: 0;top:0;}
      }
      .mid_content{
        height: 794px;padding-bottom: 98px;
        .categoryItemMinWrap{
          height: 694px;overflow: auto;
          .nodata{background: #fff;background-size: 100%;border-bottom: 0;margin: 0;padding: 0 30px;}
          .subjectDes{font-size:24px;color:rgba(153,153,153,1);line-height:33px;padding: 20px 0;text-align: center;}
        }
      }
      .mid_content_X{height: 862px;padding-bottom: 166px;}
      .bt_footer{position: absolute;bottom:0; text-align: center;z-index: 10000; width: 100%;line-height: 96px;font-size: 32px;border-top:1px solid rgba(238,238,238,1);background: #fff;
        img{width: 40px;height: 40px;transform: translateY(8px);}
      }
      .bt_footer_X{padding-bottom: 68px;}
    }
    .companyItemWrap{padding: 29px 30px 30px;display: flex;border-bottom:1px solid #eee;
      >img{width: 40px;height: 40px;align-self: center;margin-right: 15px;}
      .company{flex: 1;
        .name{display: flex;
          p{line-height: 40px;color: #333;max-width: 530px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
          font-size: 28px;font-weight: 500;}
          img{height: 30px;width: 98px;;margin:18px 0 0 10px;}
        }
        p{font-size: 28px;color: #999;line-height: 40px;padding-top: 15px;}
      }
      .option{align-self: center;color: #ddd;}
    }
}
.iphoneXOrderWrap{padding-bottom: 196px;}
  @keyframes moveUp {
  0% {
    bottom: -100%;
  }
  100% {
    bottom: 0;
  }
}
@keyframes moveDown {
  0% {
    bottom: 0;
    z-index: 8999;
  }
  100% {
    bottom: -100%;
    z-index: -1;
  }
}
</style>
