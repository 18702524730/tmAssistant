//导入自定义的全局混合
import methods from './methods/';
export default {
	methods,
  onUnload() {
    console.log('mixin onUnload')
    Object.assign(this, this.$options.data());
  },
  onShow() {
    // 页面重置顶部消息提示变量为false，保证跳转页面时不会残留顶部消息提示
    this.$store.commit('public/SHOW_MESSAGE', {visible: false})
  }
};
