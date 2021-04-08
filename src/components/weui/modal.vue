<template>
  <div class="modal-mask" @click="hideModal" catchtouchmove="preventTouchMove" v-if="showModal">
    <div class="mymodal-dialog">
      <div class="mymodal-dialog-in">
        <div class="modal-title" v-if="showTitle">
          <p class="tit">{{ title }}</p>
        </div>
        <div class="modal-content">
          <p>{{ content }}</p>
        </div>
        <div class="modal-footer">
          <div v-if="myOptions.showCancel" class="btn_item btn-cancel" @click="cancel" data-status="cancel" :style="{color: myOptions.cancelColor}">{{ myOptions.cancelText }}</div>
          <div class="btn_item btn-confirm" :class="{'line': !myOptions.showCancel}" @click="confirm" data-status="confirm" :style="{color: myOptions.confirmColor}">{{ myOptions.confirmText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const defaultOptions = {
  showCancel: true,
  cancelText: '取消',
  cancelColor: '#000000',
  confirmText: '确定',
  confirmColor: '#2F80F6'
}
export default {
  props: {
    showModal: {
      type: Boolean,
      default: true,
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    title: {//标题
      type: String,
      default: '温馨提示',
    },
    content: {//主提示
      type: String,
      default: '提示内容',
    },
    minorContent: {//次要提示
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: defaultOptions
    }
  },
  data () {
    return {
      myOptions: {...defaultOptions, ...this.options}
    }
  },
  methods: {
    //对话框取消按钮点击事件
    cancel () {
      this.$emit('confirmBtn', false);
    },
    // 成功回调
    confirm() {
      this.$emit('confirmBtn', true);
    },
    // 隐藏
    hideModal () {
      this.$emit('hide', false);
    }
  },
  watch: {
    options (v) {
      this.myOptions = {...defaultOptions, ...v};
    }
  }
}
</script>

<style lang="scss">
  .modal-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    z-index: 9000;
    color: #fff;
  }
  .mymodal-dialog {
    width: 600px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -300px;
    transform: translateY(-50%);
    z-index: 9001;
    background: #fff;
    border-radius: 10px;
    .mymodal-dialog-in{
      height: 100%;width: 100%; padding-top: 30px;
      .close_btn {
        width: 50px;
        height:50px;
        position: absolute;
        right: 0;
        top: -100px;
      }
      .company_icon {
        width: 288rpx;
        height: 252rpx;
        position: absolute;
        left: 50%;
        top: -130rpx;
        margin-left: -144rpx;
      }
      .modal-title {
        text-align: left;
        padding: 0 30px 20px 30px;
        .tit {
          font-size: 30px;
          color: #000;
        }
      }
      .modal-content {
        font-size: 30px;
        color: #666666;
        text-align: center;
        margin: 0 auto 30px;
        padding:0 38px;
        .minor{
          font-size: 24px;
          color: #999;
        }
      }
      .modal-footer {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 28rpx;
        border-top:1px solid #E5E5E5;
        .btn_item {
          width: 50%;
          height: 84px;
          line-height: 84px;
          text-align: center;
          font-size: 28px;
        }
        .btn-cancel {
          border-right:1px solid #E5E5E5;
          color: #ccc;
        }
        .btn-confirm {
          color: #09BB07;
        }
        .line {
          width: 100%;
        }
      }
    }
  }
</style>
