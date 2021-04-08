<template>
  <div class="weui-vcode-btn btn_code" :class="{'muted': isWaiting}" @click="onCodeTap">{{ btnText }}</div>
</template>

<script>
  export default {
    props: {
      second: {
        type: Number,
        default: 60
      },
      start: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        display: false,
        message: '',
        waitSecond: {},
        timeoutId: null
      }
    },
    computed: {
      isWaiting() {
        return this.waitSecond > 0;
      },
      btnText() {
        return this.isWaiting > 0 ? `请等待${this.waitSecond}秒` : '获取验证码';
      }
    },
    methods: {
      cd(ts) {
        if (this.isWaiting) {
          return;
        }
        this.waitSecond = this.second;
        this.interval = setInterval(() => {
          this.waitSecond--;
          if (this.waitSecond === 0) {
            ts && (ts.submited = false);
            clearInterval(this.interval);
          }
        }, 1000);
      },
      /**
       * 传递点击事件
       */
      onCodeTap() {
        if (this.isWaiting) {
          return;
        }
        this.$emit('startTap');
      }
    },
    watch: {
      start: function(n, o){
        if (n != o) {
          this.cd();
        }
      }
    }
  }
</script>


<style lang="scss">
  @import "../../assets/css/variable";
  .btn_code {position: absolute;bottom:5rpx;right:0;font-size:$text-lg; color: #2F80F6;;border-left:0;}
  .btn_code.muted{color:#a3a3a3;}
</style>
