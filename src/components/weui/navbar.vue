<template>
  <div class="pub_navbar">
    <div class="weui-navbar">
      <div v-for="(item, index) in tabs" :key="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick(index)">
        <div class="weui-navbar__title">{{item}}</div>
      </div>
      <div class="weui-navbar__slider" :style="'transform: translateX('+ navbarSliderClass +'rpx); width: '+navWidth+'%; left:'+ marginLeft+'%'"></div>
    </div>
  </div>

</template>

<script>
import vCode from './vcode';

export default {
  props: {
    tabs: {
      type: Array,
      default: []
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 750
    },
    marginLeft: {
      type: Number,
      default: 5   //底下滚动条距离左边的百分比
    }
  },
  data () {
    return {

    }
  },
  methods: {
    tabClick (index) {
      this.$emit('selectTab', index);
    }
  },
  computed: {
    navbarSliderClass() {
      return this.activeIndex * (this.width / this.tabs.length)
    },
    navWidth () {
      return 100 / this.tabs.length - this.marginLeft*2
    }
  },
}
</script>

<style lang="scss">
  .pub_navbar {
    width: 100%; height: 94px; background-color: #fff; position: relative; 
    .weui-navbar {
      border-bottom: none; position: relative;
    }
    .weui-navbar__slider_0 {
      transform: translateX(0);
    }
    .weui-navbar__slider_1 {
      transform: translateX(250rpx);
    }
    .weui-navbar__slider_2 {
      transform: translateX(500rpx);
    }
    .weui-bar__item_on {
      .weui-navbar__title {color: #2F80F6;}
    }
    .weui-navbar__item {
      height: 94px; line-height:94px; padding:0;
      .weui-navbar__title {font-size: 28px; line-height:94px;}
    }
    .weui-navbar__slider  {background-color: #2F80F6; height: 4px; left: 5%; }
  }

</style>
