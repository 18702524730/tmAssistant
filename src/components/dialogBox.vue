<template>
  <div class="dilog_box_wrap" v-show="isShow">
    <div class="weui-mask" @click="hideFn"></div>
    <div class="weui-dialog" style="">    
      <div class="weui-dialog__hd">
        <i class="weui-icon weui_icon_success weui-icon-success weui-icon_msg" v-if="boxType==1"></i>
        <i class="weui-icon weui_icon_safe_warn weui-icon-safe-warn weui-icon_msg" v-if="boxType==2"></i>
        <strong class="weui-dialog__title">{{ title }}</strong>
      </div> 
      <div class="weui-dialog__bd">
        <div>{{ content }}</div>
      </div> 
      <div class="weui-dialog__ft"><a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_info" :class="{'gray': boxType==2}" @click="submitFn">{{ buttonText }}</a></div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vux';

  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      boxType: {
        type: Number,
        default: 1
      },
      title: {
        type: String,
        default: '恭喜您，申请入驻成功！'
      },
      content: {
        type: String,
        default: '温馨提示，工作人员将在1个工作日内与您联系，请保持手机畅通。'
      },
      buttonText: {
        type: String,
        default: '确定'
      },
      hideOnBlur: {
        type: Boolean,
        default: true
      }
    },
    components: {
      Icon
    },
    data () {
      return {
        hide: false
      }
    },
    mounted () {
      console.log(this.title)
    },
    methods: {
      hideFn () {
        if(this.hideOnBlur){
          this.$emit('hide');
        }
        else{
          return
        }
      },
      submitFn () {
        if (this.boxType == 1) {
          this.$emit('confirm', true);
        }
        else if (this.boxType == 2){
          this.$emit('hide');
        }
      }
    }
  };
</script>

<style lang='scss'>
  @import '~assets/css/adaptation.scss';
  .dilog_box_wrap {
    .weui-icon{font-size: px(100); display:block; margin: 0 auto px(30) 0;}
    .weui-dialog__title {fon-size: px(36); color:#333;}
    .weui-dialog__bd {width: px(410); padding:0; margin: 0 auto; font-size: px(26); padding-bottom:px(30);}
    .weui-dialog__btn {color: #3DB1FA;}
    .gray {color: #999;}
  }
</style>
