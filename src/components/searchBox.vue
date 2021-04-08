<template>
  <div class="search_input" >
    <div class="input_box row-between">
      <img src="../assets/img/homepage/search.png" alt="">
      <input type="text" confirm-type="search" :placeholder="placeholder" :auto-focus="focus" v-model="content" @input="changeFn" @keyup.enter="searchFn" @confirm="searchFn">
      <span class="search" @click="searchFn" v-if="content == ''">搜索</span>
      <span class="search cancel" @click="clearFn" v-if="content != ''">取消</span>
    </div>
  </div>
</template>

<script>
  let timer = '';
  export default {
    props: {
      placeholder: {
        type: String,
        default: '请输入人才姓名，如“袁隆平”'
      },
      content: {
        type: String,
        default: ''
      },
      focus: {
        type: Boolean,
        default: false
      }
    },
    computed: {

    },
    data () {
      return {

      }
    },
    mounted () {

    },
    methods: {
      searchFn () {
        this.$emit('search', this.content);
      },
      changeFn (e) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          this.$emit('suggest', this.content);
        }, 300);
        //const value = e.mp.detail.value;
        // 定时器解决光标闪烁，中间删除 光标会自动重置到末尾的问题， 不能删除！！
        //setTimeout(() => this.$emit('update:content', value), 0);
      },
      clearFn () {
        this.content = '';
        this.$emit('suggest', this.content)
      }
    }
  };
</script>

<style lang='scss'>
  @import '~assets/css/adaptation.scss';
  .search_input {
    width: 100%; background: #fff; padding-top:20px;
    .input_box {
      width: 710px; height: 64px; background: #F2F2F2; border-radius: 34px; margin: 0 20px;
      img {width: 32px; height: 32px; margin-left: 20px;}
      input {font-size: 26px; line-height: 64px; width: 530px;}
      .search {font-size: 28px; color: #333; margin-right: 30px;}
      .cancel {color: #999;}
    }
  }
</style>
