<template>
  <div class="webWrap">
    <web-view v-if="url && !diaState" @message="message" @load="loadSuccess" :src="url"></web-view>
    <real-dia :showState="diaState">
      <div class="successDia dia">
        <img src="../../assets/img/order/green.png" />
        <h2>操作已完成</h2>
        <p>福建省厦门市鹭江公证处可能给您致电<br>请注意接听<i>前缀为0592的来电</i></p>
        <div class="realNameBtn" @click="confirm">确定</div>
      </div>
    </real-dia>
  </div>
</template>

<script>
import RealDia from 'components/realnameDialog';
export default {
  data () {
    return {
      url: '',
      diaState: false
    }
  },
  components: {
    RealDia
  },
  mounted () {
    this.url = '';
    this.diaState = false;
    this.url = this.$storage.get('signingUrl') ? this.$storage.get('signingUrl') : '';
  },
  onUnload() {
    console.log('mixin onUnload')
    Object.assign(this, this.$options.data());
  },
  methods: {
    message (e) {
        console.log('postMessage', e)
    },
    confirm () {
      wx.switchTab({url: '/pages/index/index'});
    },
    loadSuccess (ops){
      console.log('ops', ops) // https://testwechat.ipsebe.com/H5/index.html#/jumpPage?signingState=unsuccessful
      if (ops.target && ops.target.src.indexOf('wechat.ipsebe.com') != -1) {
        // wx.switchTab({url: '/pages/index/index'})
        if (ops.target.src.indexOf('signingState=unsuccessful') != -1) {
          wx.switchTab({url: '/pages/my/my'})
          return;
        }
        this.diaState = true;
      }
      console.log(ops.target.src)
    }
  }
}
</script>

<style lang="scss">
.webWrap{background: #fff;
  .realNameDia{
    .canel{display: none;}
    .successDia{padding-top: 60px;
        >img{width: 120px;height: 140px;}
        >h2{padding: 30px 0 20px;line-height: 50px;font-size: 34px;color: #333;font-weight: 600;}
        p{font-size: 26px;line-height: 44px;color: #999;padding-bottom: 40px;
          i{color: #f64744;}
        }
      }
  } 
}
 
</style>
