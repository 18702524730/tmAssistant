<template>
  <div class="u_message ">
    <div class="i-class i-message" :class="{'i-message-show': visible, 'i-message-warning': type=='warning', 'i-message-default': type=='default', 'i-message-success': type=='success', 'i-message-error': type=='error'}">
      {{ content }}
    </div>
  </div>

</template>

<script>

import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      visible: false,
      content: '',  //内容
      duration: 3,  //显示秒数
      type: 'default', // default || success || warning || error
      timeoutId: ''
    }
  },
  computed: {   // mapState函数返回的是一个对象，通过对象展开运算符将这个对象的内容插入计算属性的尾部,只不过在这个对象里可以将vuex的唯一状态值state作为参数传入
    ...mapState({   
      updateOption (state) {
        let opt = state.public.options;
        console.log(opt)
        this.visible = opt.visible;
        this.content = opt.content;
        this.type = opt.type || 'default';
        this.duration = opt.duration || 3;
        if (this.visible) {
          this.autoHide(); 
        }
      }
    })
  },
  methods: {
    ...mapActions('counter', [
      'increment',
      'decrement',
      'getProvince'
    ]),
    autoHide () {
      let time = this.duration * 1000;
      this.timeoutId && clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout( () => {
        this.$store.commit('public/SHOW_MESSAGE', {visible: false})
      }, time)
    }
  },
  watch: {
    updateOption(state) {
      
    }
  }
}
</script>

<style lang="scss">
  .u_message {
    .i-message{
      display:block;width:100%;min-height:64px;line-height:2.3;position:fixed;top:0;left:0;right:0;background:#2d8cf0;color:#fff;text-align:center;font-size:28px;z-index:10100;opacity:0;-webkit-transform:translateZ(0) translateY(-100%);transition:all .4s ease-in-out}
    .i-message-show{-webkit-transform:translateZ(0) translateY(0);opacity:1}
    .i-message-default{background:#2d8cf0}
    .i-message-success{background:#19be6b}
    .i-message-warning{background:#f90}
    .i-message-error{background:#ed3f14}
  }
</style>
