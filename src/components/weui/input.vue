<template>
  <div class="u_input ">
    <div class="weui-cell">
      <div class="weui-cell__hd" :style="'flex-basis:' + leftWidth +'rpx'"><label class="weui-label">{{ title }}</label></div>
      <div class="weui-cell__bd">
        <input v-if="!needRealTime" class="weui-input" :style="'text-align:'+ align "
          type="text"
          :value="value"
          :maxlength="maxlength"
          :confirm-type="confirmType"
          @change="change"
          :placeholder="placeholder"
        >
        <input v-if="needRealTime" class="weui-input" :style="'text-align:'+ align "
          type="text"
          :value="value"
          :maxlength="maxlength"
          :confirm-type="confirmType"
          @input.lazy="input"
          @change="change"
          :placeholder="placeholder"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    needRealTime: {
      type: Boolean,
      default: false
    },
    confirmType: {
      type: String,
      default: 'done'
    },
    align: {
      type: String,
      default: 'right'
    },
    leftWidth: {   //左边title的宽度
      type: Number,
      default: 200
    },
    value: {
      type: String,
      default: ''
    },
    title: {
      type: String
    },
    // text || textarea || password || number
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'normal'
    },
    right: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 200
    },
    isCode: {
      type: Boolean,
      default: false  //是否是验证码`
    },
    start: {
      type: Boolean,
      default: false  //是否开始倒计时
    },
    second: {
      type: Number,
      default: 60   //总秒数
    }
  },
  data () {
    return {

    }
  },
  methods: {
    input(e) {
      let v = e.mp.detail.value;
      this.$emit('update:value', v);
      return v;
    },
    change(e) {
      let v = e.mp.detail.value;
      if (!this.needRealTime) {
        this.$emit('update:value', v);
      }
      this.$emit('change', v);
    },
    startTap() {
      this.$emit('codeFn');
    }
  },
  watch: {
    value (n) {
      console.log(n);
    }
  }
}
</script>

<style lang="scss">
  .u_input {
    border-bottom:1px solid #eee; margin: 0 0 0 20px;
    .weui-cell {font-size: 28px; padding: 0;}
    .weui-label {width: 100%;display: inline-block; font-size: 28px;}
    .weui-input {height: 90px; min-height: 90px; line-height: 90px; font-size: 28px;text-align: right; padding-right: 20px;}
    // &:first-child {border-top:1px solid #eee;}
    &:last-child {border-bottom: none;}
    .input_code {width: 350px;}
  }
</style>
