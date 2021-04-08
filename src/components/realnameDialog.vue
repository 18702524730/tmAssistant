<template>
  <div class="realNameDia" v-if="showState">
    <div class="mask">
      <div class="realNameWrap">
        <!-- <div class="dia">
          <img src="../../../assets/img/index/aa.jpg" />
          <h2>根据公证处要求，在完成转让公证前，须先<i>实名认证</i></h2>
          <div class="realNameBtn" @click="goRealName">立即认证</div>
        </div> -->
        <slot></slot>
        <div class="canel" @click="close"><sebe-icon type="close" color="#eee" size="40" /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    showState: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
  .realNameDia {
    .mask {
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
    .realNameWrap {
      position: absolute;
      top: 50%;
      left: 50%;
      right: 0;
      margin-left: -280px;
      height: auto;
      transform: translateY(-50%);
      z-index: 12000;

      .dia {
        background: #fff;
        width: 560px;
        padding-bottom: 50px;
        border-radius: 8px;
        margin-bottom: 50px;
        text-align: center;
        font-size: 0;
        > img {
          border-radius: 8px 8px 0 0;
          width: 560px;
          height: 340px;
          font-size: 0;
          transform: translateY(-1rpx);
        }
        h2 {
          padding: 40px;
          font-size: 30px;
          line-height: 50px;
          font-weight: 400;
          color: #333;
          i{color: #F64744;font-weight: 500;}
        }
        .realNameBtn {
          margin: 0 40px;
          height: 90px;
          line-height: 90px;
          background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%);
          border-radius: 45px;
          font-size: 30px;
          color: #fff;
        }
      }
      .canel {
        width: 90px;
        height: 90px;
        border-radius: 45px;
        // background: #fff;
        margin-left: 235px;
        text-align: center;
        line-height: 84px;
        border: 1px solid #eee;
        position: relative;
        // &:after {
        //   position: absolute;
        //   top: -50px;
        //   left: 45px;
        //   height: 50px;
        //   width: 1px;
        //   border-left:1px dashed #eee;
        //   content: "";
        // }
      }
    }
  }
 
</style>
