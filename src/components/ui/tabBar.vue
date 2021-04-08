<template>
  <div class="tab_cotent" :style="'width:' + width + 'rpx; height:' + height + 'rpx'">
    <span class="tab" v-for="(item, index) in tabs" :key="index" :class="{'t_active': index == activeIndex}" :style="'width:' + navWidth + '%; line-height:' + height +'rpx'"  @click="tabClick(index)">{{ item }}</span>
    <div class="bar" :style="'transform: translateX('+ navbarSliderClass +'rpx); width: '+barWidth+'%; left:'+ marginLeft+'%'"></div>
  </div>

</template>

<script>
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
    height: {
      type: Number,
      default: 60   //单位都是rpx
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
    barWidth () {
      return 100 / this.tabs.length - this.marginLeft*2
    },
    navWidth () {
      return 100 / this.tabs.length
    },
  },
}
</script>

<style lang="scss">
  .tab_cotent {
    position: relative;
    .tab {font-size: 28px; color: #333; display: inline-block; height: 100%; text-align: center;}
    .t_active {font-size: 32px; color: #333; font-weight: bold; display: inline-block; }
    .bar {position:absolute; bottom: 0; height: 4px; background: #3576FF; transition: all 0.3s;}
  }

</style>
