<template>
  <div class="apply_post">
    <div class="tp_header" @click="addAddress">
      <img src="../../assets/img/icon/addIcon.png" mode="accpetFit" alt="">
      新增地址
    </div>
    <template v-if="dataLists && dataLists.length && loaded">
      <scroll-view class="mid_content" :class="['mid_content', isIphoneX ? 'mid_content_X' : '']" scroll-y="true">
        <div class="addressList">
          <div class="row-between addressItemWrap" v-for="(item, index) in dataLists" :key="index" @click="handleClickAddress(item)">
            <img v-if="addressId === item.id" src="../../assets/img/icon/check1.png" mode="accpetFit" alt="">
            <img v-else src="../../assets/img/icon/check2.png" mode="accpetFit" alt="">
            <div class="address">
              <div class="name">
                <span>{{item.addresseeName}}</span><span>{{item.addresseePhone}}</span>
              </div>
              <p>{{item.addresseeCityTxt}}{{item.addresseeAdd}}</p>
            </div>
            <div class="option" @click.stop="editAddress(item)">编辑</div>
          </div>
        </div>
      </scroll-view>
    </template>

    <!-- 没订单 -->
    <div class="column-start null_single" :class="{'null_single_X': isIphoneX}" v-if="dataLists && !dataLists.length && loaded">
      <img src="~assets/img/my/emptyImg.png">
      <div class="txt mt10">暂无地址信息</div>
    </div>
    <div class="bt_footer" :class="['bt_footer', isIphoneX ? 'bt_footer_X' : '']" v-if="dataLists && dataLists.length && loaded">
      <div class="apply_btn" @click="imApply">立即申请</div>
    </div>
    <u-message/>
    <!-- 确认提交弹框 -->
    <real-dia :showState="confirmDiaState" @close="confirmDiaState = false" >
      <div class="dia">
        <img src="../../assets/img/my/post.png" />
        <h2>公证书将使用到付的方式寄出,提交后将不可修改地址，请确保您选择的地址的准确性。</h2>
        <div class="realNameBtn" @click="confirmFn">确认提交</div>
      </div>
    </real-dia>
  </div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  import RealDia from 'components/realnameDialog';
  import { _debounce } from 'utils/public';
  import mixin from 'mixins/';
  export default {
    mixins: [mixin],
    data(){
      return{
        dataLists: [],
        loaded:false,
        orderSn:'',
        isIphoneX: false,
        confirmDiaState: false,
        addressId: '',
      }
    },
    onShow(){
      let query = this.$root.$mp.query;
      this.orderSn = query.orderSn;
      this.search()
    },
    mounted () {
      this.isIphoneX = this.judgeIsPhoneX()
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
    components: {
      RealDia
    },
    methods: {
      handleClickAddress(item){
        this.addressId = item.id;
      },
      addAddress() {
        this.$router.push({
          path: '/pages/my/addAddress',
          query: {
            id: 0
          }
        })
      },
      editAddress(item){
        this.$router.push({
          path: '/pages/my/addAddress',
          query: {
            ...item
          }
        })
      },
      // 弹窗回调
      confirmFn: _debounce(async function (data) {
        if (data) {
          try {
            let resp = await this.API.my.createOrderAddress(this.orderSn, this.addressId);
            this.confirmDiaState = false;
            this.$router.go(-1);
          }
          catch (e) {
          }
        }
        else{
          console.log('取消回调')
        }
      }, 500, true),
      imApply() {
        if (!this.addressId) {
          this.tips('请选择地址');
          return;
        }
        this.confirmDiaState = true;
      },
      async search(){//初始化
        try {
          let resp = await this.API.my.selectAddressList();
          this.loaded = true;
          console.log(resp)
          let isExist = false;
          resp.forEach((item) => {
            item.addresseeCityTxt = item.addresseeCity.split(' ').join('');
            if (item.id === this.addressId) {
              isExist = true;
            }
          })
          // 删除后清空addressId
          if (!isExist) {
            this.addressId = '';
          }
          this.dataLists = resp;
        }
        catch (e) {
        }
      },
    },
    watch: {
    }
  }
</script>
<style lang="scss">
  .apply_post{
    height:100%;position: relative;
    .tp_header{text-align: center;width: 100%;line-height: 98px;font-size: 30px;background: #fff;
      img{width: 40px;height: 40px;transform: translateY(9px);}
    }
    .mid_content{
      position: absolute;top: 98px; right: 0; bottom: 130px; left: 0;background-color:#f8f8f8;
      .addressList{
        padding-top: 20px;
        .addressItemWrap{
          height: 184px;padding: 30px;background-color: #fff;border-bottom: 1PX solid #eee;
          &:last-child{border-bottom: 0}
          img{width: 40px;height: 40px;}
          .address{
            width: 557px;
            .name{
              vertical-align: top;
              span{display: inline-block;font-size:28px;line-height:40px;color: #333;margin-right: 40px;font-weight: 600;vertical-align: top;}
              span:first-child{max-width: 280px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
            }
            p{margin-top: 10px;font-size:26px;line-height: 37px;overflow: hidden;height: 74px;color: #999;word-break: break-all;}
          }
          .option{width: 50px;height:33px;line-height: 33px;font-size:24px;}
        }
      }
    }
    .mid_content_X{bottom: 198px;}

    .null_single{
      position: absolute;top: 98px; right: 0; bottom: 130px; left: 0;background-color:#f8f8f8;align-items: center;
      img{width: 422px; height: 384px;margin-top: 177px;}
      .txt{height:40px;line-height: 40px;font-size:28px;color: #999;}
    }
    .null_single_X{bottom: 198px;}

    .bt_footer{
      position: fixed;bottom:0;z-index: 2000; width: 100%;height:130px;background: #fff;padding: 20px;
      .apply_btn{height:90px;background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%);border-radius:45px;eight:42px;font-size:30px;line-height: 90px;text-align: center;color: #fff;}
    }
    .bt_footer_X{padding-bottom: 68px;height:198px;}

    .realNameDia{
      .realNameWrap{
        .dia {
          > img {height: 240px}
        }
      }
    }
  }
</style>
