<template>
  <div class="search_input_wrap row-between" >
    <div class="input_box row-start" :class="{'input_box_line': !showText}">
      <img src="../../assets/img/icon/search.png" alt="">
      <input type="text" confirm-type="search" :placeholder="placeholder" placeholder-class="place_css" :auto-focus="focus" v-model="content" @input="changeFn" @focus="focusFn" @keyup.enter="searchFn" @confirm="searchFn">
    </div>
    <p class="submit" v-if="showText">
      <span class="search" @click="searchFn" >搜索</span>
      <!-- <span class="search cancel" @click="clearFn" v-if="content != ''">取消</span> -->
    </p>
  </div>
</template>

<script>
  let timer = '';
  export default {
    props: {
      placeholder: {
        type: String,
        default: '输入企业名称，查企业知识产权信息'
      },
      content: {
        type: String,
        default: ''
      },
      focus: {
        type: Boolean,
        default: false
      },
      showText: {  //是否显示搜索文字
        type: Boolean,
        default: true
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
        if(this.content.length >= 4) {
          timer && clearTimeout(timer);
          timer = setTimeout(() => {
            this.$emit('suggest', this.content);
          }, 300);
        }
        //const value = e.mp.detail.value;
        // 定时器解决光标闪烁，中间删除 光标会自动重置到末尾的问题， 不能删除！！
        //setTimeout(() => this.$emit('update:content', value), 0);
      },
      focusFn () {
        this.$emit('focus', this.content);
      },
      clearFn () {
        this.$emit('suggest', this.content)
      }
    }
  };
</script>

<style lang='scss'>
  @import '~assets/css/adaptation.scss';
  .search_input_wrap {
    background: #fff; padding:20px 32px 30px 32px;
    .input_box {
      width: 590px; height: 70px; background: #F2F2F2; border-radius: 4px;
      img {width: 28px; height: 28px; margin-left: 24px; margin-right: 10px;}
      input {font-size: 26px; line-height: 64px; width: 530px;}
      .place_css {color: #999;}
    }
    .input_box_line {
      width: 686px;
    }
    .submit {
      text-align: right;
      .search {font-size: 32px; color: #333;}
      .cancel {color: #999;}
    }
  }
</style>
