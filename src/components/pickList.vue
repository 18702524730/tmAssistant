<template>
  <div class="pick_wrap" v-if="showList">
    <div class="pick_bg" @click="hideFn()"></div>
    <div class="pick_fixed" :class="{'move': showList, 'moveDown': !showList}">
      <div class="pick_item" v-for="(item, index) in list" :key="index" @click="selectFn(item)">{{ item.title }}</div>
      <div class="cancel" @click="hideFn()">取消</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: []
      },
      showList: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
      }
    },
    methods: {
      selectFn (item) {
        this.$emit('select', item)
      },
      hideFn () {
        this.$emit('hide', false)
      }
    }
  }
</script>

<style lang="scss">
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
    }
    100% {
      bottom: -100%;
    }
  }
  .pick_bg {width: 100%; height: 100%; position: fixed; left: 0; top: 0; background: rgba(0,0,0,.5); z-index: 1; }
  .pick_fixed {
    width:100%; height: 340px; background: #f7f7f7; position: fixed; left: 0; bottom: -350px; z-index: 10;
    &.move {animation: moveUp 0.2s ease-out; animation-fill-mode: forwards;}
    &.moveDown {animation: moveDown 0.2s ease-out; animation-fill-mode: forwards; }
    .pick_item {
      width: 100%; height: 105px; line-height: 105px; border-bottom:1px solid #E5E5E5; text-align: center; font-size: 32px; color: #333; background: #fff;
      &:last-child {border-bottom:none;};
    }
    .cancel {width: 100%; height: 105px; line-height: 105px; font-size: 32px; color: #333; background: #fff; text-align: center; margin-top: 20px;}
  }
</style>
