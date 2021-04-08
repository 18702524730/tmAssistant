<template>
  <div class="transition_up" v-if="myShow" :class="show ? 'show_animation' : 'hide_animation'">
    <div class="mask_bg"  @click="hideFn" @touchmove.top="fn"></div>
    <div class="transition_wrap" >
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Number,
      default: 250
    }
  },
  data () {
    return {
      myShow: false,
    }
  },
  methods: {
    fn(){},
    hideFn() {
      this.$emit('hide');
    }
  },
  watch: {
    show() {
      if (this.show) {
        this.myShow = true;
      }else{
        setTimeout(() => {
          this.myShow = false;
        }, this.delay)
      }
    }
  }
}
</script>

<style lang="scss">
  @keyframes moveUp {
    from {
      transform: translateY(100%)
    }
    to {
      transform: translateY(0)
    }
  }
  @keyframes moveDown {
    from {
      transform: translateY(0)
    }
    to {
      transform: translateY(100%)
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .transition_up {
    position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 8999;
    .mask_bg {position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 9000;background-color: rgba(0, 0, 0, 0.5);}
    .transition_wrap {
      position:fixed; left:0; bottom: 0; z-index:9001; width: 100%; height: auto; max-height: 90%;background: #fff; box-shadow:0px -10px 30px 0px rgba(47,128,246,0.09); border-radius:10px 10px 0px 0px; overflow: hidden;display: flex;flex-direction: row;align-items: stretch;
    }
  }
  .show_animation {
    .mask_bg {animation: fadeIn 0.3s ease-out; display:block;}
    .transition_wrap {animation: moveUp 0.3s ease-out; bottom: 0;}
  }
  .hide_animation {
    .mask_bg {animation: fadeOut 0.3s ease-out; display:block;}
    .transition_wrap {animation: moveDown 0.3s ease-out; bottom: 0;}
  }

</style>
